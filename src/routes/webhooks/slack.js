import { createEventAdapter } from '@slack/events-api';
import { DiscordAction } from "../../classes/actions/discord.js";
import FlowHandler from '../../classes/FlowHandler.js';
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);


// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
    console.log(`Received a message event: user: ${event.user} in channel: ${event.channel} says: ${event.text}`);

    let discWebhook = new DiscordAction(process.env.DISCORD_WEBHOOK_TEST);
    discWebhook.execute("sendMessage", [`Received a message from SLACK: user: ${event.user} in channel: ${event.channel} says: ${event.text}`]);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

export const SlackAction = slackEvents;
