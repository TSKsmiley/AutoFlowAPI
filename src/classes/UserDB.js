import { userModel } from '../models/userModel.js'
import { DiscordAction } from './actions/discord.js';
import TokenDB from './TokenDB.js';
import _ from 'lodash';

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
        return _.cloneDeep(this.#user._id);
    }

    /**
     * Function to retrieve all flows
     * @returns {Array} flows
     */
    getFlows() {
        return _.cloneDeep(this.#user.flows);
    }

    /**
     * Function to retrieve a specific flow
     * @param {String} token 
     * @returns {Object} flow
     */
    getFlow(token = String){
        return _.cloneDeep(this.#user.flows.id(token));
    }

    /**
     * Function to add a new flow to the userDB and tokenDB
     * @param {Object} flow 
     * @param {Function} callBack
     * @callback callBack function is called the the flow as parameter
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
     * @param {String} token 
     * @param {Function} callBack 
     * @callback callBack function is called
     */
    removeFlow(token = String, callBack = () => {}) {
        // Removing the flow from the specific user
        userModel.updateOne(
            { _id: this.#user._id },
            { $pull: { flows: { _id: token} } },
            { multi: false }
            , function(err){
                if (err){
                    console.log('[error] Encountered an error while pulling flow' + err);
                    throw("[error] Encountered an error while pulling flow");
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
     * @param {String} content
     */
    log(content) {
        this.#user.logs.push(content);
        this.#user.save();
    }

    /**
     * Function for getting / retrieving log
     * @returns {Array} logs
     */
     getLog() {
        return _.cloneDeep(this.#user.logs);
    }

    /**
     * Function for clearing the log
     * @param {Function} callBack
     * @callback callBack function is called
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

    /**
     * Function for adding slack team ids
     * @param {String} slackID
     */
    addSlackID(slackID = String, callBack = () => {}){
        this.#user.slackIDs.push(slackID);
        this.#user.save();
        callBack();
    }

    /**
     * Function for getting / retrieving log
     * @returns {Array} SlackIDs
     */
    getSlackIDs(){
        return _.cloneDeep(this.#user.slackIDs);
    }

    static findAllSlackUsersById(slackID = String, callBack = () => {}){
        const slackUsers = [];
        // recurse through all users in the database

        console.log(`[info] Searching for all users with the slackID: ${slackID}`);
        let cursor = userModel.find({slackIDs: slackID}).cursor();

        // TODO: find a way to make this less janky
        (async ()=>
        {
            for (let user = await cursor.next(); user != null; user = await cursor.next()) {
                console.log("slack " + user._id);
                const tempUser = new UserDB(user._id);
                slackUsers.push(tempUser);
                console.log(tempUser.getID());
                console.log(slackUsers);
            }
            callBack(slackUsers);
    })();
    }


}
