import mongoose from 'mongoose';
import { userModel } from '../models/userModel.js'
import { DiscordWebhook } from './webhooks/discord.js';

export class UserDB {
    #user;
    constructor (userID){
        userModel.findOneOrCreate({_id:userID}, (err, user)=>{
            if (!err) {
                this.#user = user;
            }
            else {
                const discordMailFail = new DiscordWebhook(process.env.DISCORD_WEBHOOK_ERROR)
                discordMailFail.execute("embedMessage", [{Title: "Error", description: `FATAL ERROR WHEN CREATING NEW USER => ${err}`}]);
            }
        })
    }

    async getFlows() {
        return this.#user.flows;
    }

    async getFlow(token){
        const tempFlow = userModel.findOne({"_id" : this.#user._id, 'flows._id' : token}, function(err,list){
            if (err){
                console.log('Encountered an error while retrieving flow' + err);
            }
        });

        return tempFlow;
    }

    async addFlow(flow){
        this.#user.flows.push(flow);
        this.#user.save();
    }

    async removeFlow(token) {
        await userModel.updateOne(
            { _id: this.#user._id },
            { 
                $pull: { 
                    flows: { $elemMatch: { _id: token} } 
                } 
            },
            { multi: false }
            , function(err,list){
                if (err){
                    console.log('Encountered an error while pulling flow' + err);
                }
            });
        await userModel.save();
    }
    
}
