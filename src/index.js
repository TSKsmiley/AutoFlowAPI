/// Imports
import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors  from "cors";

import { webpanelHandler } from './routes/webpanelHandler.js';
import { GithubAction } from './routes/webhooks/github.js';

import {userModel} from './models/actionModel.js';

const app = express();

// cors so that we can acces the api form the frontpage(react) that is on a different subdomain
app.use(cors());
app.use(express.json());

// Imports > routes
app.use('/actions/github', GithubAction);
app.use("/routes/webpanelHandler", webpanelHandler);

/// Variables

app.get('/', (req, res) => {
  res.send("DEV lol");
})


mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true })
	.then(() => {
        console.log("[info] connected to mongoDB");
        
        app.listen(8000, () => {
            console.log('[info] listening on port http://localhost:8000'); 
        });


        let Smiley = userModel.findById("Smiley");

        if(Smiley) {
            console.log("[info] userModel.findById('Smiley') found Smiley");
            console.log(Smiley.flows);
            return;
        }
        let testUser = new userModel({_id:"Smiley", flows:[{platform:"github", platformAction:"any", action:[{name:"DiscordWebhook", action:"embedMessage", content:"test"}]}]});
        testUser.save();
})

