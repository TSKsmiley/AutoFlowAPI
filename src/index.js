/// Imports
import express from 'express';
const app = express();
import {githubAction} from './routes/Actions/github.js'

import { discordWebhook } from './classes/actions/discord.js'
//import {actionModel} from './models/actionModel.js'

// Imports > routes
app.use('/actions/github', githubAction);

let testHook = new discordWebhook("/", "https://discord.com/api/webhooks/948867218555412500/dVyR7wK6lb8tdmG0lk2x7NByPRqLNMWOUzUK2mbqUPrltkrniEvlQD25Mr1VuqCDiQH6")


/// Variables




app.get('/', (req, res) => {
  res.send("DEV lol");
  testHook.execute("hej dev");
})


app.listen(8000, () => {
  console.log('listening on port http://localhost:8000');
});
