import { userModel } from '../models/userModel.js'
import { DiscordAction } from './actions/discord.js';
import TokenDB from './TokenDB.js';

/** 
 * UserDB class making accessing information about the specific user extremely easy
 */
export default class UserDB {
    #user;
    constructor (userID, callBack = () => {}){
        userModel.findOneOrCreate({_id:userID}, (err, user)=>{
            if (!err) {
                this.#user = user;
                callBack(this);
            }
            else {
                console.log(err);
                const discordMailFail = new DiscordAction(process.env.DISCORD_WEBHOOK_ERROR);
                discordMailFail.execute("embedMessage", [{Title: "Error", description: `FATAL ERROR WHEN CREATING NEW USER => ${err}`}]);
            }
        })
    }

    /**
     * Function to return userID
     * @returns {String} id
     */
    getID(){
        return this.#user._id;
    }

    /**
     * Function to retrieve all flows
     * @returns {array} flows
     */
    getFlows() {
        return this.#user.flows;
    }

    /**
     * Function to retrieve a specific flow
     * @param {*} token 
     * @returns {Object} flow
     */
    getFlow(token = String){
        return this.#user.flows.id(token);
    }

    /**
     * Function to add a new flow to the userDB and tokenDB
     * @param {*} flow 
     * @param {*} callBack 
     */
    addFlow(flow, callBack = () => {}){
        TokenDB.genrateToken(this.#user._id).then((token)=>{
            flow._id = token;
            this.#user.flows.push(flow);
            this.log(`Created the flow with the following token: ${token}`);
            callBack(token);
        });
    }

    /**
     * Function to remove flow from the userDB and tokenDB
     * @param {*} token 
     * @param {*} callBack 
     */
    removeFlow(token = String, callBack = () => {}) {
        // Removing the flow from the specific user
        userModel.updateOne(
            { _id: this.#user._id },
            { $pull: { flows: { _id: token} } },
            { multi: false }
            , function(err){
                if (err){
                    console.log('Encountered an error while pulling flow' + err);
                }
            }).clone().then(()=>{
                // Removing the flow from the token database
                TokenDB.deleteToken(token, () => {
                    this.log(`Removed the flow with the following token: ${token}`);
                    callBack();
                });
                
            });
    }

    /**
     * Function for logging events
     */
    log(content) {
        this.#user.logs.push(content);
        this.#user.save();
    }

    /**
     * Function for getting / retrieving log
     */
     getLog() {
        return this.#user.logs;
    }

    /**
     * Function for clearing the log
     */
    clearLog(callBack = () => {}) {
        userModel.updateOne(
            { _id: this.#user._id },
            { $set: { logs: [] } }
            , function(err){
                if (err){
                    console.log('Encountered an error while pulling logs' + err);
                }
            }).clone().then(()=>{callBack()});
    }
}
