import express from "express";
import { DiscordWebhook } from "../../classes/webhooks/discord.js";
import 'dotenv/config';
import {userModel} from "../../models/actionModel.js";

const platformID = "github";
const testHook = new DiscordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);

const Router = express.Router();


Router.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('ok'); 
})

Router.post('/:userID', (req, res) => {
    try {
        let user = userModel.findById(req.params.userID);

        user.flows.forEach(flow => {
            if (flow.platform === platformID){
                flow.action.forEach(action => {
                    if (action.name === "DiscordWebhook"){
                        testHook.execute(action.action, action.content);
                    }
                })
            }
        })


        console.log(req.body);
        res.status(200).send('ok');
    } catch (error) {
        console.log(error);
    }
    
})

export const GithubAction = Router;
