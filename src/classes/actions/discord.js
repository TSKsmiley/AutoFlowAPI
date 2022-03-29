import Action from '../action.js';
import axios from 'axios';

export class DiscordAction extends Action {
    constructor(hookURL, usernameDefault = "AutoFlow", avatarURL = "https://media.discordapp.net/attachments/938428428540076123/948160710918172712/Asset_14x.png?width=765&height=681") {
        super();
        this.description = 'Send a message to a discord webhook';
        this.hookURL = hookURL;
        this.usernameDefault = usernameDefault;
        this.avatarURL = avatarURL;
    }

    //Private variables
    #error404Picture = "https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Error-Page.gif";
    #embedError = [{image:{url: this.#error404Picture}}];
    #messageError = "For some reason this message is empty";
    
    //Execute function
    execute(action, arg) {    
        console.log("[info] executing webhook action")

        switch (action) {
            case ("sendMessage"):
                this.#sendMessage((!arg[0]) ? this.#messageError : arg[0], arg[1], arg[2]);
                break;

            case ("embedMessage"):
                this.#sendEmbed( (!arg[0]) ? this.#embedError : arg[0], arg[1], arg[2]);
                break;

            default:
                this.#sendMessage("Invalid action (argument 0)", arg[1], arg[2]);
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

    #sendEmbed (content, username, avatar_url) {
        axios.post(this.hookURL, {
            embeds: content,
            username,
            avatar_url,
        }).then(()=>{
            console.log("[info] executed webhook action")
        })
    }

}
