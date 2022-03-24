import express from "express";
import { DiscordWebhook } from "../../classes/webhooks/discord.js";
import 'dotenv/config';

const platformID = "github";
const testHook = new DiscordWebhook(process.env.DISCORD_WEBHOOK_TEST);


const Router = express.Router();


Router.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('ok'); 
})

Router.post('/:userID', async function (req, res) {
    console.log(`[info] starting github flow for user: ${req.params.userID}`);
    res.status(200).send('ok');
})

export const GithubAction = Router;
