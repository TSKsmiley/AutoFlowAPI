import Action from '../action.js';
import axios from 'axios';

/**
 * Constants to make it easier to worg with the arguments in the execute func
 */
 const argContent = 0, argUsername = 1, argAvatar = 2;

/**
 * Class for handling Discord actions 
 */
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
    
    /**
     * Function for executing a discord action
     * @param {String} action 
     * @param {Array} arg 
     */
    execute(action, arg) {
        if (arg[1] === undefined) 
            arg[1] = this.usernameDefault;
        if (arg[2] === undefined)
            arg[2] = this.avatarURL;

        console.log("[info] executing webhook action")
        const content = arg[argContent] || this.#messageError;
        const username = arg[argUsername] || this.usernameDefault;
        const avatarURL = arg[argAvatar] || this.avatarURL;

        switch (action) {
            case ("sendMessage"):
                this.#sendMessage((!arg[0]) ? this.#messageError : content, username, avatarURL);
                break;

            case ("embedMessage"):
                this.#sendEmbed( (!arg[0]) ? this.#embedError : JSON.parse(content), username, avatarURL);
                break;

            default:
                this.#sendMessage("Invalid action (argument 0)", username, avatarURL);
        }
    }

    /**
     * Private function for sending a discord message
     * @param {String} content 
     * @param {String} username 
     * @param {String} avatar_url 
     */
    #sendMessage (content, username, avatar_url) {
        axios.post(this.hookURL, {
            content,
            username,
            avatar_url,
        }).then(()=>{
            console.log("[info] executed webhook action")
        }).catch((e) => {
            console.log(`[error] Failed executing Dicord action. Error: ${e}`);
        })
    }

    /**
     * Function for sending embedded Discord messages
     * @param {Object} content 
     * @param {String} username 
     * @param {String} avatar_url 
     */
    #sendEmbed (content, username, avatar_url) {
        axios.post(this.hookURL, {
            embeds: content,
            username,
            avatar_url,
        }).then(()=>{
            console.log("[info] executed webhook action")
        }).catch((e) => {
            console.log(`[error] Failed executing Dicord action. Error: ${e}`);
        })
    }

}
