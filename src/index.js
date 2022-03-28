/// Imports
import express, { Router } from 'express';
import 'dotenv/config';
import cors  from "cors";
import bodyParser from "body-parser";
import { webpanelHandler } from './routes/webpanelHandler.js';
import { GithubAction } from './routes/webhooks/github.js';
import { slackAPIsej } from './routes/webhooks/slack.js';
import { DiscordWebhook } from './classes/webhooks/discord.js';

import UserDB  from './classes/UserDB.js';
import TokenDB  from './classes/TokenDB.js';
import FlowHandler from './classes/FlowHandler.js'

import mongoose from 'mongoose';


const app = express();

// cors so that we can access the api form the frontpage(react) that is on a different subdomain.
app.use(cors());

app.use('/actions/slack', express.raw({ type: '*/*' }), slackAPIsej.requestListener());

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Imports > routes
app.use('/actions/github', GithubAction);
app.use('/routes/webpanelHandler', webpanelHandler);

/// Variables

app.get('/', (req, res) => {
  res.send("DEV lol");
})

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(async function () {
        console.log("[info] connected to mongoDB");

        new UserDB("arnarfreyr29@gmail.com", (user) => {
          //user.addFlow({platform:"test",platformAction:"gaming",actions:[{action:"pcGame"}]})
          //user.removeFlow("692c0a93-e32e-47cd-90ba-385b27cb0ddf");
          //user.removeFlow("4f32faf7-118c-4369-abee-71d9825a699f");
        });

        //FlowHandler.executeFlow("7b5b1c1a-28c1-4ab3-8eb3-e79d7f51c5f5");
        

        app.listen(8000, async function ()  {
            console.log('[info] listening on port http://localhost:8000'); 
        });
})



