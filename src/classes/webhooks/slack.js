import Action from '../action.js';
import axios from 'axios';
import { Webclient } from '@slack/events-api'

export class SlackMessager extends Action{
    constructor(channelID) {
        super();
        this.channelID = channelID;
    }
    // An access token (from your Slack app or custom integration - xoxp, xoxb)
    
    
    execute(action, channelID = this.channelID, message) {

        switch(action){
            case("slackMessage"):
                // An access token (from your Slack app or custom integration - xoxp, xoxb)
                const web = new WebClient(process.env.SLACK_TOKEN);

                (async () => {
                    // See: https://api.slack.com/methods/chat.postMessage
                    const res = await web.chat.postMessage({ channel: channelID, text: message });

                    // `res` contains information about the posted message
                    console.log('Message sent: ', res.ts);
                })();
            break;

            default:
                console.log("Missing action input in execute slack message");
        }
    }
}
