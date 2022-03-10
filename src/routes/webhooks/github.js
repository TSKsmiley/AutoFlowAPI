import express from "express";
import { DiscordWebhook } from "../../classes/webhooks/discord.js";
import 'dotenv/config';
import {DB} from '../../classes/DB.js'

const platformID = "github";
const testHook = new DiscordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);

const Router = express.Router();


Router.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('ok'); 
})

Router.post('/:userID', async function (req, res) {
    const flows = await DB.getFlows(req.params.userID);
    for (const flow of flows) {
        if (flow.platform === platformID) {
            testHook.execute('embedMessage', [{fields:[{name:"gaming",value:flow.action[0].content}]}])
        }
    }
    res.status(200).send('ok');
})

export const GithubAction = Router;
