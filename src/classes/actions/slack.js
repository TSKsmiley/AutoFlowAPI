import Action from '../action.js';
import { WebClient } from '@slack/web-api';
import { DiscordAction } from './discord.js';

export class SlackAction extends Action {
    constructor(caller, slackURL, slackMessage = "This is default") {
        super(caller);
        this.slackURL = slackURL;
        this.slackMessage = slackMessage;
    }
    // An access token (from your Slack app or custom integration - xoxp, xoxb)
    
    
    execute(action, message, channelID = this.channelID) {

        switch(action) {
            case("slackMessage"):
                // An access token (from your Slack app or custom integration - xoxp, xoxb)
                const web = new WebClient(process.env.SLACK_TOKEN);

                (async () => {
                    // See: https://api.slack.com/methods/chat.postMessage
                    const res = await web.chat.postMessage({ channel: channelID, text: `${message}` });

                    // `res` contains information about the posted message
                    console.log('Message sent: ', res.ts);
                })();
            break;

            default:
                console.log("[INFO] Missing action input in execute slack message");

                const slackMailFail = new DiscordAction(process.env.DISCORD_WEBHOOK_ERROR);
                
                slackMailFail.execute("embedMessage", [{Title: "Error", description: `They wrote: "${action}" in slack.js`}]);
        }
    }
}
