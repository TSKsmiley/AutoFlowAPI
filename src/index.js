/// Imports
import express from 'express';
import 'dotenv/config';
import cors  from "cors";

import { webpanelHandler } from './routes/webpanelHandler.js';
import { GithubAction } from './routes/webhooks/github.js';
import { slackAPI } from './routes/webhooks/slack.js';


import { DB } from './classes/DB.js';

const app = express();

// cors so that we can acces the api form the frontpage(react) that is on a different subdomain.
app.use(cors());
app.use(express.json());

// Imports > routes
app.use('/actions/github', GithubAction);
app.use("/actions/slack", slackAPI);
app.use("/routes/webpanelHandler", webpanelHandler);

/// Variables

app.get('/', (req, res) => {
  res.send("DEV lol");
})


DB.init(() => {
        console.log("[info] connected to mongoDB");
        app.listen(8000, () => {
            console.log('[info] listening on port http://localhost:8000'); 
        });
})

