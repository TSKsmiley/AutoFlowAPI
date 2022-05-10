import express from "express";
import Auth from "../../classes/Auth.js";
import { flowInfo } from "../../flowInfo.js";


// Creating object for handeling routes.
const Router = express.Router();

/**
 * Get request for retrieving information on routes / actions
 */
Router.get('/', (req,res) => {
    Auth.verify(req.headers.authorization).then((userID) => {
        res.status(200).json(flowInfo);
    }, (error) => {
        console.log(`[error] Failed authenticating ${error.message}`);
        res.status(401).send(error.message); // http status code 401: unauthorized
    });
})

export const flowInfoRoute = Router;
