import nodemailer  from "nodemailer";
import Action from '../action.js';
import { DiscordAction } from "./discord.js";

/**
 * Constants to make it easier to worg with the arguments in the execute func
 */
const argMailTo = 0, argMailSubject = 1, argMailText = 2;

const discordMailFail = new DiscordAction(process.env.DISCORD_WEBHOOK_ERROR);

export class MailAction extends Action {
    constructor(mailTo, mailSubjectDefault = "Nothing to see", mailTextDefault = "Just checking in! :)") {
        super();
        this.mailTo;
        this.mailSubjectDefault = mailSubjectDefault;
        this.mailTextDefault = mailTextDefault;
    }

    execute(action, arg){
        const mailTo = (!arg[argMailTo]) ? arg[argMailTo] : this.mailTo;
        const mailSubject = (!arg[argMailSubject]) ? arg[argMailSubject] : this.mailSubjectmailSubjectDefault;
        const mailText = (!arg[argMailText]) ? arg[argMailText] : this.mailTextmailTextDefault;

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
                
                //Who to send to and what to send
                var mailOptions = {
                    from: process.env.MAIL_ADRESS,
                    to: mailTo,
                    subject: mailSubject,
                    text: mailText
                }

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                break;
            //If more, add
            default:
                console.log("[info] An accident has occured. We hit the default case");

                
                discordMailFail.execute("embedMessage", [{Title: "Error", description: `They wrote: "${action}" in sendMail.js`}]);
                break;
        }
    }
}
