/// Imports
import express from 'express';
import 'dotenv/config';
import cors  from "cors";

import { webpanelHandler } from './routes/webpanelHandler.js';
import { GithubAction } from './routes/webhooks/github.js';
import { SlackWebhook } from './classes/webhooks/slack.js';

import { DB } from './classes/DB.js';

const app = express();
const slackMessage = new SlackWebhook("/", "https://hooks.slack.com/services/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");

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


DB.init(() => {
        console.log("[info] connected to mongoDB");
        app.listen(8000, () => {
            console.log('[info] listening on port http://localhost:8000'); 
        });
})

slackMessage.execute();
