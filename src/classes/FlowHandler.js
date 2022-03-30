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
                return new DiscordAction(action.options[0], action.options[1], action.options[2]);
            case ("Mail"):
                return new MailAction(action.options[0], action.options[1], action.options[2]);
        }
    }

    /**
     *  This function is used to parse a string with variables and replace them with the correct values
     */
    static parseString(string, data) {
        let tempData = data;
        return string.replace(/\{([^}]*)\}/g, function (m, v) {
            console.log(m, v);
            let values = v.split(".");
            
            // This for loop lets us step into the data object for example: {repository.name} 
            for (let i=0; i<values.length; i++) {
                tempData = tempData[values[i]];
            }
             return tempData || m; 
            })
    }

    static parseArray(array, data) {
        for (let i = 0; i < array.length; i++) {
            array[i] = this.parseString(array[i], data);
        }
        return array;
    }

    static executeFlow(token, platformAction, data) {
        console.log("[info] Executing flow");
        TokenDB.getUser(token, (user) => {
            const flow = user.getFlow(token);
            if (!flow) return user.log("[error] flow not found for token: " + token);

            // Make sure the flow only executes the action if the platform


            if (!flow.platformActions.includes(platformAction) && flow.platformActions.length != 0) return user.log(`[info] platformAction not found for token: ${token}`);

            // For ... of loop for executing the actions
            for (let action of flow.actions) {
                console.log(action);
                const actionInstance = this.getAction(action);
                actionInstance.execute(action.action, this.parseArray(action.content, data));
            }

            console.log(flow);
        });
    }
}
