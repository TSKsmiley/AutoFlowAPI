import Action from '../action.js';
import axios from 'axios';

export class SlackWebhook extends Action {
    constructor(caller, slackURL, slackMessage = "This is default") {
        super(caller);
        this.slackURL = slackURL;
        this.slackMessage = slackMessage;
    }

    execute(webHookURL = this.slackURL, message = this.slackMessage) {
        console.log("[info] executing slack webhook action");
        axios.post(webHookURL, {
            text : message
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
    }
}

