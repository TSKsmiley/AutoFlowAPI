import nodemailer  from "nodemailer";
import Action from '../action.js';
import { DiscordAction } from "./discord.js";

/**
 * Constants to make it easier to worg with the arguments in the execute func
 */
const argMailTo = 0, argMailSubject = 1, argMailText = 2;

/**
 * Class for handling Mail actions
 */
export class MailAction extends Action {
    constructor(mailTo, mailSubjectDefault = "Nothing to see", mailTextDefault = "Just checking in! :)") {
        super();
        this.mailTo = mailTo;
        this.mailSubjectDefault = mailSubjectDefault;
        this.mailTextDefault = mailTextDefault;
    }

    /**
     * Function for executing a Mail action
     * @param {String} action 
     * @param {Array} arg 
     */
    execute(action, arg){
        const mailTo = arg[argMailTo] || this.mailTo;
        const mailSubject = arg[argMailSubject] || this.mailSubjectmailSubjectDefault;
        const mailText = arg[argMailText] || this.mailTextmailTextDefault;

        // Switch for handling different types of Mail actions
        switch (action) {
            case ("sendMail"):
                //The sender authentication
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.MAIL_ADRESS,
                        pass: process.env.MAIL_PASSWORD
                    }
                })
                
                // Mail options object containing information on the specific mail
                var mailOptions = {
                    from: process.env.MAIL_ADRESS,
                    to: mailTo,
                    subject: mailSubject,
                    text: mailText
                }

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        // Sending an error message to the Discord error channel
                        const discordMailFail = new DiscordAction(process.env.DISCORD_WEBHOOK_ERROR);
                        discordMailFail.execute("embedMessage", [[{title: "Error", description: `They wrote: "${action}" in sendMail.js`}]])
                        
                        // Logging error
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                break;
            default:
                console.log("[info] An accident has occured. We hit the default case");
                
                // Sending a discord message in the case of an error occouring
                const discordMailFail = new DiscordAction(process.env.DISCORD_WEBHOOK_ERROR);
                discordMailFail.execute("embedMessage", [[{title: "Error", description: `They wrote: "${action}" in sendMail.js`}]]);
                break;
        }
    }
}
