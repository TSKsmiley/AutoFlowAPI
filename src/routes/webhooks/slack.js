import { DiscordWebhook } from "../../classes/webhooks/discord.js";
import 'dotenv/config';
import express from "express";

const testHook = new DiscordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);
const platformID = "slack";

const Router = express.Router();

Router.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).send(req.body.challenge); 
})

export const slackAPI = Router;
