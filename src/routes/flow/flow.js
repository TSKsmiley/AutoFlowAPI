import express from "express";
import Auth from "../../classes/auth";
import UserDB from "../../classes/UserDB";

//TODO
//Lav endpoint - Modtage post request der så laver det flow på frontend
//Skal have en token med som finder den mail der skal bruges.
//Med den mail kan vi tilføje det flow til UserDB. 

//TODO: post request er til at tilføje flows til databasen.

//TODO: get request er til at hente flows fra databasen.

const Router = express.Router();
const authenticator = new Auth;

Router.post('/', (req,res) => {
    const webpanelObj = req.body;
    authenticator.verify(webpanelObj.token).then((token) => {
        new UserDB(userID, (user) => {
            user.addFlow(webpanelObj.flow, (token) => {
                res.status(200).send(token);
            });
        });
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(400).send(send.message);
    });
})

Router.get('/', (req,res) => {
    const webpanelObj = req.body;
    authenticator.verify(webpanelObj.token).then((userID) => {
        new UserDB(userID, (user) => {
            res.status(200).send(user.getFlows());
        });
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(400).send(send.message);
    });
})

export const flowAuth = Router;
