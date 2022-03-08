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

    //Private variables
    #error404 = "https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Error-Page.gif";
    
    //Execute function
    execute(action, content, username = this.usernameDefault, avatarURL = this.avatarURL) {    
        console.log("[info] executing webhook action")

        switch (action) {
            case ("sendMessage"):
                this.sendMessage((!content) ? "For some reason this message is empty" : content, username, avatarURL);
                break;

            case ("embedMessage"):
                axios.post(this.hookURL, {
                    embeds: (!content) ? [{image:{url: this.#error404}}]: content,
                    username,
                    avatar_url: avatarURL,
                }).then(()=>{
                    console.log("[info] executed webhook action")
                })
                break;

            default:
                this.sendMessage("Invalid argument", username, avatarURL);
        }
        
    }

    #sendMessage (content, username, avatar_url) {
        axios.post(this.hookURL, {
            content,
            username,
            avatar_url,
        }).then(()=>{
            console.log("[info] executed webhook action")
        })
    }

}
