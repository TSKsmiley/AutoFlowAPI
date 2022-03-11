import nodemailer  from "nodemailer";
import Action from '../action.js';
import { DiscordWebhook } from "./discord.js";

//Brugeren angiver mail
//Angiver brugeren hvilken action der skal aktivere et mail send.
//Bruge nodeMailer?
//Vi sender fra vores Autoflow mail
//Brugeren skal inputte deres mail,

export class Nodemail extends Action {
    constructor(mailTo, mailSubjectDefault = "Nothing to see", mailTextDefault = "Just checking in! :)") {
        super();
        this.mailTo;
        this.mailSubjectDefault = mailSubjectDefault;
        this.mailTextDefault = mailTextDefault;
    }

    execute(action, mailTo = this.mailTo, mailSubject = this.mailSubjectDefault, mailText = this.mailTextDefault){
        
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

                const discordMailFail = new DiscordWebhook(process.env.DISCORD_WEBHOOK_ERROR)
                
                discordMailFail.execute("embedMessage", [{Title: "Error", description: `They wrote: "${action}" in sendMail.js`}]);
                break;
        }
    }
}
