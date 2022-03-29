import TokenDB from './TokenDB.js';
import UserDB from './UserDB.js';

/**
 * Imports for the execution webhooks
 */
import { DiscordAction } from './actions/discord.js';
import { SlackAction } from './actions/slack.js';
import { MailAction } from './actions/sendMail.js';

export default class FlowHandler{
    static getAction(action){
        switch (action.name) {
            case ("Discord"):
                return new DiscordAction(action.option[0], action.option[1], action.option[2]);
            case ("Mail"):
                return new MailAction(action.option[0], action.option[1], action.option[2]);
        }
    }

    static executeFlow(token, platformAction, data) {
        TokenDB.getUser(token, (user) => {
            const flow = user.getFlow(token);
            if (!flow) return user.log("[error] flow not found for token: " + token);

            // Make sure the flow only executes the action if the platform
            if (!flow.platformActions.includes(platformAction) && !flow.platformActions.length == 0) return user.log(`[info] platformAction not found for token: ${token}`);

            // For ... of loop for executing the actions
            for (let action of flow.actions) {
                const actionInstance = this.getAction(action);
                actionInstance.execute()
            }

            console.log(flow);
        });
    }
}
