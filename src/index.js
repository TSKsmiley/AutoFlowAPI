/// Imports
import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from 'mongoose';

// File path packages
import path from 'path';
import {fileURLToPath} from 'url';


// Importing the environment file (.env)
import 'dotenv/config';

// Importing routers for the different routes
import { GithubAction } from './routes/webhooks/github.js';
import { SlackAction } from './routes/webhooks/slack.js';
import { webpanelHandler } from './routes/webpanelHandler.js';
import { OAuthApp } from './routes/OAuth/passport.js';

const app = express();

// Using cors to access the api from the frontpage(react) located on a different subdomain.
app.use(cors());

// Setting up the different routes
app.use('/actions/github', bodyParser.json(), GithubAction);
app.use('/actions/slack', SlackAction.requestListener());
app.use('/flow', bodyParser.json(), webpanelHandler);
app.use('/auth', OAuthApp)

// File path variables for providing error HTML page
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/index.html'));
})

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(async function () {
    console.log("[info] connected to mongoDB");

    app.listen(8000, async function ()  {
        console.log('[info] listening on port http://localhost:8000'); 
    });
})
