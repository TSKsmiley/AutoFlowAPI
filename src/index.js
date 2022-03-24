/// Imports
import express from 'express';
import 'dotenv/config';
import cors  from "cors";

import { webpanelHandler } from './routes/webpanelHandler.js';
import { GithubAction } from './routes/webhooks/github.js';

import  UserDB  from './classes/UserDB.js';
import  TokenDB  from './classes/TokenDB.js';
import FlowHandler from './classes/FlowHandler.js'

import mongoose from 'mongoose';

const app = express();

// cors so that we can acces the api form the frontpage(react) that is on a different subdomain.
app.use(cors());
app.use(express.json());

// Imports > routes
app.use('/actions/github', GithubAction);
app.use("/routes/webpanelHandler", webpanelHandler);

/// Variables

app.get('/', (req, res) => {
  res.send("DEV lol");
})

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(async function () {
        console.log("[info] connected to mongoDB");

        /*new UserDB("arnarfreyr29@gmail.com", async function (user) {
          //user.addFlow({platform:"test",platformActions:"gaming"})
          //await user.removeFlow("ce70e5ed-98cd-4a6b-aaca-2b6f462d37b8");
        });

        FlowHandler.executeFlow("7b5b1c1a-28c1-4ab3-8eb3-e79d7f51c5f5");
        */

        app.listen(8003, async function ()  {
            console.log('[info] listening on port http://localhost:8003'); 
        });
})
