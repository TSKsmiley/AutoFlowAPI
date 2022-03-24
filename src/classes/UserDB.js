import mongoose from 'mongoose';
import { userModel } from '../models/userModel.js'
import { DiscordWebhook } from './webhooks/discord.js';
import TokenDB from './TokenDB.js';

/** 
 * UserDB class making accessing information about the specific user extremely easy
 */
export default class UserDB {
    #user;
    constructor (userID, callBack){
        userModel.findOneOrCreate({_id:userID}, (err, user)=>{
            if (!err) {
                this.#user = user;
                callBack(this);
            }
            else {
                console.log(err);
                const discordMailFail = new DiscordWebhook(process.env.DISCORD_WEBHOOK_ERROR)
                discordMailFail.execute("embedMessage", [{Title: "Error", description: `FATAL ERROR WHEN CREATING NEW USER => ${err}`}]);
            }
        })
    }

    

    getID(){
        return this.#user._id;
    }

    // Function to retrieve all flows
    agetFlows() {
        return this.#user.flows;
    }

    // Function to retrieve a specific flow
    getFlow(token = String){
        return this.#user.flows.id(token);
    }

    // Function to add a new flow to the userDB and tokenDB
    addFlow(flow){
        TokenDB.genrateToken(this.#user._id).then((token)=>{
            flow._id = token;
            this.#user.flows.push(flow);
            this.#user.save();
        });
    }

    // Function to remove flow from the userDB and tokenDB
    removeFlow(token = String) {
        // Removing the flow from the specific user
        userModel.updateOne(
            { _id: this.#user._id },
            { $pull: { flows: { _id: token} } },
            { multi: false }
            , function(err,list){
                if (err){
                    console.log('Encountered an error while pulling flow' + err);
                }
            }).clone().then(()=>{
                // Removing the flow from the token database
                TokenDB.deleteToken(token);
            });
        
        
    }

    log(content) {
        this.#user.logs.push(content);
        this.#user.save();
    }

    /**
     * TODO: Finish this
     */
    async clearLog() {
        this.#user.logs.length = 0;
        this.#user.save();
        await userModel.updateOne(
            { _id: this.#user._id },
            { $pullAll: { logs } },
            { multi: true }
            , function(err,list){
                if (err){
                    console.log('Encountered an error while pulling logs' + err);
                }
            }).clone();
    }
}
