import { createEventAdapter } from '@slack/events-api';
import { DiscordAction } from "../../classes/actions/discord.js";
import FlowHandler from '../../classes/FlowHandler.js';
import UserDB from '../../classes/UserDB.js';
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);


// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
    console.log(`-------------------------------------------------------`);
    console.log(event);
    console.log(`-------------------------------------------------------`);

    UserDB.findAllSlackUsersById(event.team, (users = [String]) => {
        /** @type {UserDB} */
        for(let userID of users){
            let user = new UserDB(userID);
            console.log(`found user: ${user._id}`);
            for(let flow of user.getFlows()){
                if(flow.arguments.includes(event.team)){
                    console.log(`EXECUTING: ${flow.platform} for user: ${user._id}`);
                    FlowHandler.executeFlowDirect(user,flow,event.type,event);
                }
            }
        }
    });

    //let discWebhook = new DiscordAction(process.env.DISCORD_WEBHOOK_TEST);
    //discWebhook.execute("sendMessage", [`Received a message from SLACK: user: ${event.user} in channel: ${event.channel} says: ${event.text}`]);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

export const SlackAction = slackEvents;
