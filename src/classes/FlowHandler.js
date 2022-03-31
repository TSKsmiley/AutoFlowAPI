import TokenDB from './TokenDB.js';
import UserDB from './UserDB.js';

/**
 * Imports for the execution webhooks
 */
import { DiscordAction } from './actions/discord.js';
import { SlackAction } from './actions/slack.js';
import { MailAction } from './actions/sendMail.js';

export default class FlowHandler {
    static getAction(action) {
        switch (action.name) {
            case ("Discord"):
                return new DiscordAction(action.options[0], action.options[1], action.options[2]);
            case ("Mail"):
                return new MailAction(action.options[0], action.options[1], action.options[2]);
            case ("Slack"):
                return new SlackAction(action.options[0], action.options[1]);
        }
    }

    /**
     *  This function is used to parse a string with variables and replace them with the correct values
     * @param {*} array 
     * @param {*} data 
     * @returns {String} String with the specific variables inserted
     */
    static parseString(string, data) {
        let tempString = string;
        return tempString.replace(/\{([^}]*)\}/g, (m, v) => {
            try {
                let tempData = data;
                let values = v.split(".");

                // This for loop lets us step into the data object for example: {repository.name} 
                for (let i = 0; i < values.length; i++) {
                    tempData = tempData[values[i]];
                }
                return tempData || m;
            }
            catch (e) {
                return m;
            }
        })
    }

    /**
     * Function for dynamically parsing data into arrays
     * @param {*} array 
     * @param {*} data 
     * @returns {Array} Array containing the specified data
     */
    static parseArray(array, data) {
        let tempArray = array;
        for (let i = 0; i < tempArray.length; i++) {
            tempArray[i] = this.parseString(tempArray[i], data);
        }
        return tempArray;
    }

    /**
     * Function for executing flow based on the flow of the specific token
     * @param {*} token 
     * @param {*} platformAction 
     * @param {*} data 
     */
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
                let tempAction = JSON.parse(JSON.stringify(action));
                const actionInstance = this.getAction(action);
                actionInstance.execute(tempAction.action, this.parseArray(tempAction.content, data));
                user.log(`[info] Executed action: ${tempAction.name} with type: ${tempAction.action}`);
            }

            console.log(flow);
        });
    }
}
