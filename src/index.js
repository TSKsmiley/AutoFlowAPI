/// Imports
import express from 'express';
import 'dotenv/config';
import cors  from "cors";

import { webpanelHandler } from './routes/webpanelHandler.js';
import { GithubAction } from './routes/webhooks/github.js';

import { DB } from './classes/DB.js';
import { Nodemail } from './classes/webhooks/sendMail.js';

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


DB.init(() => {
        console.log("[info] connected to mongoDB");
        app.listen(8000, () => {
            console.log('[info] listening on port http://localhost:8000'); 
        });
})


const mailTestHook = new Nodemail("sebastianbusk@live.dk");
mailTestHook.execute("sendMail", "sebastianbusk@live.dk");