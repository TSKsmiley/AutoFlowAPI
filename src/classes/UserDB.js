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
    
}
