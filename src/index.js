/// Imports
import express from 'express';
import { discordWebhook } from './classes/actions/discord.js'
//import {actionModel} from './models/actionModel.js'
import {teamsRouter} from './teams.js'

// Imports > routes
app.use('/actions/teams', teamsRouter);

let testHook = new discordWebhook("/", "https://discord.com/api/webhooks/948867218555412500/dVyR7wK6lb8tdmG0lk2x7NByPRqLNMWOUzUK2mbqUPrltkrniEvlQD25Mr1VuqCDiQH6")


/// Variables
const app = express();



app.get('/', (req, res) => {
  res.send("DEV lol");
  testHook.execute("hej dev");
})


app.listen(8000, () => {
  console.log('listening on port http://localhost:8000');
});
