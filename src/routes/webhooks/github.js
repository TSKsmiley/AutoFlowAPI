import express from "express";
import { DiscordWebhook } from "../../classes/webhooks/discord.js";
import 'dotenv/config';
import {userModel} from '../../models/actionModel.js';
import {DB} from '../../classes/DB.js'

const platformID = "github";
const testHook = new DiscordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);

const Router = express.Router();


Router.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('ok'); 
})

Router.post('/:userID', async function (req, res) {
    console.log(await DB.getFlows(req.params.userID));
    res.status(200).send('ok');
})

export const GithubAction = Router;
