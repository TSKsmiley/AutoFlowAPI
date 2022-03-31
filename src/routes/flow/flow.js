import express from "express";
import Auth from "../../classes/Auth.js";
import UserDB from "../../classes/UserDB.js";

//TODO
//Lav endpoint - Modtage post request der så laver det flow på frontend
//Skal have en token med som finder den mail der skal bruges.
//Med den mail kan vi tilføje det flow til UserDB. 

//TODO: get request er til at hente flows fra databasen.

const Router = express.Router();
const authenticator = new Auth;

/**
 * Post request to add flows to the database
 */
Router.post('/', (req,res) => {
    const webpanelObj = req.body;
    authenticator.verify(webpanelObj.token).then((userID) => {
        new UserDB(userID, (user) => {
            user.addFlow(webpanelObj.flow, (token) => {
                res.status(200).send(token);
            });
        });
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(400).send(error.message);
    });
})

/**
 * Get request to get existing flows from the database
 */
Router.get('/', (req,res) => {
    const webpanelObj = req.body;
    authenticator.verify(webpanelObj.token).then((userID) => {
        new UserDB(userID, (user) => {
            res.status(200).send(user.getFlows());
        });
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(400).send(error.message);
    });
})

export const flowRoute = Router;
