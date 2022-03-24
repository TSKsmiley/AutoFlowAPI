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
                const discordMailFail = new DiscordWebhook(process.env.DISCORD_WEBHOOK_ERROR)
                discordMailFail.execute("embedMessage", [{Title: "Error", description: `FATAL ERROR WHEN CREATING NEW USER => ${err}`}]);
            }
        })
    }

    

    async getID(){
        return this.#user._id;
    }

    // Function to retrieve all flows
    async getFlows() {
        return this.#user.flows;
    }

    // Function to retrieve a specific flow
    async getFlow(token = String){
        userModel.findOne({"_id" : this.#user._id, 'flows._id' : token}, (err,flow)=>{
            if (!err){
                return flow;
            }
            else {
                console.log('Encountered an error while retrieving flow' + err);
            }
        });

    }

    // Function to add a new flow to the userDB and tokenDB
    async addFlow(flow ){
        flow._id = await TokenDB.genrateToken(this.#user._id);
        this.#user.flows.push(flow);
        this.#user.save();
    }

    // Function to remove flow from the userDB and tokenDB
    async removeFlow(token = String) {
        // Removing the flow from the specific user
        await userModel.updateOne(
            { _id: this.#user._id },
            { $pull: { flows: { _id: token} } },
            { multi: false }
            , function(err,list){
                if (err){
                    console.log('Encountered an error while pulling flow' + err);
                }
            }).clone();
        
        // Removing the flow from the token database
        TokenDB.deleteToken(token);
    }
    
}
