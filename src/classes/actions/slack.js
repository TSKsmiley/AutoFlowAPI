import Action from '../action.js';
import { WebClient } from '@slack/web-api';
import { DiscordAction } from './discord.js';

/**
 * Constants to make it easier to worg with the arguments in the execute func
 */
const argChannelID = 0, argMessage = 1;

/**
 * Class for handling Slack actions 
 */
export class SlackAction extends Action {
    constructor(defaultChannelID, defaultMessage = "This is default") {
        super();
        this.channelID = defaultChannelID;
        this.slackMessage = defaultMessage;
    }


    execute(action, arg) {
        const channelID = arg[argChannelID] || this.channelID;
        const message = arg[argMessage] || this.slackMessage;

        switch (action) {
            case ("slackMessage"):
                // An access token (from your Slack app or custom integration - xoxp, xoxb)
                const web = new WebClient(process.env.SLACK_TOKEN);

                (async (gg) => {
                    // See: https://api.slack.com/methods/chat.postMessage
                    const res = await web.chat.postMessage({ channel: channelID, text: `${message}` });

                    // `res` contains information about the posted message
                    console.log('Message sent: ', res.ts, gg);
                })("gg");
                break;

            default:
                console.log("[INFO] Missing action input in execute slack message");

                // Sending a Discord message in the case of an error occouring
                const slackMailFail = new DiscordAction(process.env.DISCORD_WEBHOOK_ERROR);

                slackMailFail.execute("embedMessage", [{ Title: "Error", description: `They wrote: "${action}" in slack.js` }]);
        }
    }
}
