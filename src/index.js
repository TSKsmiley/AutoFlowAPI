/// Imports
import express from 'express';
import 'dotenv/config';
import cors  from "cors";
import bodyParser from "body-parser";
import { webpanelHandler } from './routes/webpanelHandler.js';
import { GithubAction } from './routes/webhooks/github.js';
import { slackAPI } from './routes/webhooks/slack.js';

import UserDB  from './classes/UserDB.js';
import TokenDB  from './classes/TokenDB.js';
import FlowHandler from './classes/FlowHandler.js'

import mongoose from 'mongoose';


const app = express();

// cors so that we can acces the api form the frontpage(react) that is on a different subdomain.
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Imports > routes
app.use('/actions/github', GithubAction);
app.use('/actions/slack', slackAPI);
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
          //user.log("Ass and tities and windows xp");
          //console.log(user.getLog()[0]);
          //user.clearLog();
          //user.log("Hejdin penis");
          //user.addFlow({platform:"GitHub",platformActions:[""],actions:[{name: "Discord", action: "sendMessage", content: "GitHub just triggered this flow"}]});
        });

        

        //FlowHandler.executeFlow("1d130d85-933c-4c98-9661-c93e7e8c4640", "pullRequest", { action: "opened", repository: { name: "test" } });
        

        app.listen(8000, async function ()  {
            console.log('[info] listening on port http://localhost:8000'); 
        });
})
