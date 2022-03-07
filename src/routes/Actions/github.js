import express from "express";
import { request } from "express";
import { discordWebhook } from "../../classes/actions/discord.js";

const testHook = new discordWebhook("/", "https://discord.com/api/webhooks/948867218555412500/dVyR7wK6lb8tdmG0lk2x7NByPRqLNMWOUzUK2mbqUPrltkrniEvlQD25Mr1VuqCDiQH6");

const Router = express.Router();


Router.get('/', (req, res) => {
    console.log(request.body);
  res.status(200).send('ok');
})

Router.post('/', (req, res) => {
    //todo: dat action stuffs
    testHook.execute("```json\n" + req.body.action + "```");
    console.log(request.body);
    res.status(200).send('ok');
})



export const githubAction = Router;
