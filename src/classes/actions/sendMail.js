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
                    host: "smtp.office365.com", // hostname
                    secureConnection: false, // TLS requires secureConnection to be false
                    port: 587, // port for secure SMTP
                    tls: {
                        ciphers:'SSLv3'
                    },
                    auth: {
                        user: process.env.MAIL_ADDRESS_OUTLOOK,
                        pass: process.env.MAIL_PASSWORD_OUTLOOK
                    }
                })
                
                // Mail options object containing information on the specific mail
                var mailOptions = {
                    from: process.env.MAIL_ADDRESS_OUTLOOK,
                    to: mailTo,
                    subject: mailSubject,
                    text: mailText
                }

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        // Sending an error message to the Discord error channel
                        const discordMailFail = new DiscordAction(process.env.DISCORD_WEBHOOK_ERROR);
                        discordMailFail.execute("embedMessage", [[{title: "Error", description: `Failed to send mail to email: ${mailTo}`}]])
                        
                        // Logging error
                        console.log(`[error] An error occoured while sending an email: ${error}`);
                    } else {
                        console.log(`[info] Email sent: ${info.response}`);
                    }
                });
                break;
            default:
                console.log("[info] An accident has occured. We hit the default case");
                
                // Sending a discord message in the case of an error occouring
                const discordMailFail = new DiscordWebhook(process.env.DISCORD_WEBHOOK_ERROR);
                
                discordMailFail.execute("embedMessage", [{Title: "Error", description: `They wrote: "${action}" in sendMail.js`}]);
                break;
        }
    }
}
