/// Imports
import express from 'express';
const app = express();
import 'dotenv/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {userModel} from './models/actionModel.js';


import {GithubAction} from './routes/webhooks/github.js'

import { DiscordWebhook } from './classes/webhooks/discord.js'
//import {actionModel} from './models/actionModel.js'


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Imports > routes
app.use('/actions/github', GithubAction);

let testHook = new DiscordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);



/// Variables
app.get('/', (req, res) => {
  res.send("DEV lol");
  testHook.execute("embedMessage");
})


mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true })
	.then(() => {
        console.log("[info] connected to mongoDB");
        app.listen(8000, () => {
            console.log('[info] listening on port http://localhost:8000'); 
        });
        if(userModel.findById("Smiley")) return;
        let testUser = new userModel({_id:"Smiley", flows:[{platform:"github", platformAction:"any", action:[{name:"DiscordWebhook", action:"embedMessage", content:"test"}]}]});
        testUser.save();
})

