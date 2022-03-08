/// Imports
import express from 'express';
const app = express();
import 'dotenv/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import {githubAction} from './routes/Actions/github.js'

import { discordWebhook } from './classes/actions/discord.js'
//import {actionModel} from './models/actionModel.js'


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Imports > routes
app.use('/actions/github', githubAction);

let testHook = new discordWebhook("/", process.env.DISCORD_WEBHOOK_TEST);


/// Variables
app.get('/', (req, res) => {
  res.send("DEV lol");
  testHook.execute("sendMessage", "testing arg1:)");
})


mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true })
	.then(() => {
		app.listen(8000, () => {
            console.log('listening on port http://localhost:8000');
          });
	})


