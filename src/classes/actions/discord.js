import Action from '../action.js';
import axios from 'axios';
import chalk from 'chalk';

export class discordWebhook extends Action {
    constructor(caller, hookURL) {
        super(caller);
        this.description = 'Send a message to a discord webhook';
        this.hookURL = hookURL;
    }
    
    execute(msg, username = "AutoFlow", avatar_url = "https://media.discordapp.net/attachments/938428428540076123/948160710918172712/Asset_14x.png?width=765&height=681") {
        console.log(chalk.yellow("[info] executing webhook action"))
        axios.post(this.hookURL, {
            content: msg,
            username,
            avatar_url
        }).then(()=>{
            console.log(chalk.green("[info] executed webhook action"))
        })
    }
}
