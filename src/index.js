/// Imports
import express from 'express';
const app = express();
import 'dotenv/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {userModel} from './models/actionModel.js';


import {GithubAction} from './routes/Actions/github.js'

import { DiscordWebhook } from './classes/actions/discord.js'
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
    app.listen(8000, () => {
      console.log('listening on port http://localhost:8000');
    });
    let testUser = new userModel({_id:"Smiley", actions:[{name:"test", action:"test"}]});
    testUser.save();
	})


