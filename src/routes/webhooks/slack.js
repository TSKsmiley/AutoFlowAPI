import { DiscordWebhook } from "../../classes/webhooks/discord.js";
import 'dotenv/config';
import express from "express";

const testHook = new DiscordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);
const platformID = "slack";

const Router = express.Router();



Router.get('/', async function (req, res) {
    console.log(req.body);
    res.send(200, 'OK', {"challenge": process.env.SLACK_VER_TOKEN});
})

export const slackAPI = Router;
