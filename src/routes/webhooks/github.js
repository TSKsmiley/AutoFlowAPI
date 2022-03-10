import express from "express";
import { DiscordWebhook } from "../../classes/actions/discord.js";
import 'dotenv/config';
import {userModel} from '../../models/actionModel.js';

const platformID = "github";
const testHook = new DiscordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);

const Router = express.Router();


Router.get('/', (req, res) => {
    console.log(req.body);
  res.status(200).send('ok'); 
})

Router.post('/:userID', async function (req, res) {
    try {
        console.log(`Attempting to find user with id: ${req.params.userID}`);
        const user = await userModel.findById(req.params.userID);

        console.log(`Found user: ${user}`);


        console.log(req.body);
        res.status(200).send('ok');
    } catch (error) {
        console.log(error);
        res.status(500).send('error');
    }
    
})

export const GithubAction = Router;
