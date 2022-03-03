import Action from '../action.js';
import axios from 'axios';

export class discordWebhook extends Action {
    constructor(caller, hookURL) {
        super(caller);
        this.description = 'Send a message to a discord webhook';
        this.hookURL = hookURL;
    }
    
    async execute(msg) {
        axios.post(this.hookURL, {
            content: msg,
            username: "AutoFlow"
        }).then(()=>{
            console.log('[executed] webhook action');
        });
        
    }
}