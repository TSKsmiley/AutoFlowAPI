import nodemailer  from "nodemailer";
import Action from '../action.js';

//Brugeren angiver mail
//Angiver brugeren hvilken action der skal aktivere et mail send.
//Bruge nodeMailer?
//Vi sender fra vores Autoflow mail
//Brugeren skal inputte deres mail,

export class Nodemail extends Action {
    constructor(caller, mailTo, mailSubject, mailText)
}


var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'AutoFlow@gmail.com',
          pass: 'AdminPassword'
        }
      });
      
      var mailOptions = {
        from: 'AutoFlow@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
