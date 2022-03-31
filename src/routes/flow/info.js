import express from "express";
import Auth from "../../classes/Auth.js";
import { flowInfo } from "../../flowInfo.js";


// Creating objects for handeling routes and user authentication.
const Router = express.Router();
const authenticator = new Auth;

/**
 * Get request for retrieving information on routes / actions
 */
Router.get('/', (req,res) => {
    const webpanelObj = req.body;
    authenticator.verify(req.headers.authorization).then((userID) => {
        res.status(200).json(flowInfo);
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(401).send(error.message);
    });
})

export const flowInfoRoute = Router;
