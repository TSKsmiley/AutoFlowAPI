import express from "express";
import { request } from "express";
import { discordWebhook } from "../../classes/actions/discord.js";
import 'dotenv/config';


const testHook = new discordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);

const Router = express.Router();


Router.get('/', (req, res) => {
    console.log(req.body);
  res.status(200).send('ok'); 
})

Router.post('/:userID', (req, res) => {
    //todo: dat action stuffs
    testHook.execute("```json\n" + req.body.repository.name + "```");
    console.log(req.body);
    res.status(200).send('ok');
})

export const githubAction = Router;
