import Action from '../action.js';
import axios from 'axios';

export class discordWebhook extends Action {
    constructor(caller, hookURL) {
        super(caller);
        this.description = 'Send a message to a discord webhook';
        this.hookURL = hookURL;
    }
    
    execute(content, username = "AutoFlow", avatar_url = "https://media.discordapp.net/attachments/938428428540076123/948160710918172712/Asset_14x.png?width=765&height=681") {
    content = encodeURIComponent(content);    
    console.log("[info] executing webhook action")
        axios.post(this.hookURL, {
            content,
            username,
            avatar_url
        }).then(()=>{
            console.log("[info] executed webhook action")
        })
    }
}
