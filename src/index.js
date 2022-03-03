/// Imports
import express from 'express';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import { discordWebhook } from './classes/actions/discord.js'
//import {actionModel} from './models/actionModel.js'

// Imports > routes


let testHook = new discordWebhook("/", "https://discord.com/api/webhooks/948867218555412500/dVyR7wK6lb8tdmG0lk2x7NByPRqLNMWOUzUK2mbqUPrltkrniEvlQD25Mr1VuqCDiQH6")


/// Variables
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();



app.get('/', (req, res) => {
  res.send("hey");
  testHook.execute("test");
})


app.listen(8080, () => {
  console.log('listening on port http://localhost:8080');
});
