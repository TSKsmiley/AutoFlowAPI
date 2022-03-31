import express from "express";
import Auth from "../../classes/Auth.js";
import { flowInfo } from "../../flowInfo.js";

const Router = express.Router();
const authenticator = new Auth;

/**
 * Post request for retrieving information on routes / actions
 */

Router.post('/', (req,res) => {
    const webpanelObj = req.body;
    authenticator.verify(webpanelObj.token).then((userID) => {
        res.status(200).send(flowInfo);
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(400).send(error.message);
    });
})

export const flowInfoRoute = Router;
