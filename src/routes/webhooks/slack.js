import { DiscordWebhook } from "../../classes/webhooks/discord.js";
import 'dotenv/config';
import express from "express";

const testHook = new DiscordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);
const platformID = "slack";

const Router = express.Router();

Router.post('/', async function (req, res) {
    console.log(req.body);
    res.send({headers: { authorization: `Bearer ${process.env.SLACK_VER_TOKEN}`});
})

export const slackAPI = Router;
