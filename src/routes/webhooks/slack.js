import { createEventAdapter } from '@slack/events-api';
import { DiscordAction } from "../../classes/actions/discord.js";
import FlowHandler from '../../classes/FlowHandler.js';
import UserDB from '../../classes/UserDB.js';
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);


// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
    UserDB.findAllSlackUsersById(event.team, (users = [String]) => {
        /** @type {UserDB} */
        for(let userID of users){
            new UserDB(userID, (user) => {
                console.log(`found user: ${user.getID()} from ${userID}`);
                for(let flow of user.getFlows()){
                if(flow.arguments.includes(event.team)){
                    console.log(`EXECUTING: ${flow.platform} for user: ${user._id}`);
                    FlowHandler.executeFlowDirect(user,flow,event.type,event);
                }
            }
            });
        }
    });
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

export const SlackAction = slackEvents;
