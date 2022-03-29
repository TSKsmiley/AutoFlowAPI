import Action from '../action.js';
import { Webclient } from '@slack/web-api';
import { DiscordWebhook } from './discord.js';

export class SlackMessager extends Action{
    constructor(channelID) {
        super();
        this.channelID = channelID;
    }
    // An access token (from your Slack app or custom integration - xoxp, xoxb)
    
    
    execute(action, channelID = this.channelID, message) {

        switch(action) {
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
                console.log("[INFO] Missing action input in execute slack message");

                const slackMailFail = new DiscordWebhook(process.env.DISCORD_WEBHOOK_ERROR);
                
                slackMailFail.execute("embedMessage", [{Title: "Error", description: `They wrote: "${action}" in slack.js`}]);
        }
    }
}
