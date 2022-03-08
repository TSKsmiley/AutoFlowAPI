import Action from '../action.js';
import axios from 'axios';

export class discordWebhook extends Action {
    constructor(caller, hookURL, usernameDefault = "AutoFlow", avatarURL = "https://media.discordapp.net/attachments/938428428540076123/948160710918172712/Asset_14x.png?width=765&height=681") {
        super(caller);
        this.description = 'Send a message to a discord webhook';
        this.hookURL = hookURL;
        this.usernameDefault = usernameDefault;
        this.avatarURL = avatarURL;
    }
    
    execute(action, arg1, arg2, arg3, arg4, arg5) {    
        console.log("[info] executing webhook action")

        switch (action) {
            case ("sendMessage"):
                axios.post(this.hookURL, {
                    content: (!arg1) ? "For some reason this message is empty" : arg1,
                    username: this.usernameDefault,
                    avatar_url: this.avatarURL
                }).then(()=>{
                    console.log("[info] executed webhook action")
                })
                break;
            default:
                console.log("Action not defined");
        }
        
    }
}
