import express from "express";
import 'dotenv/config';
import FlowHandler from "../../classes/FlowHandler.js";

const platformID = "github";
const Router = express.Router();

/**
 * Get request for checking the /actions/github endpoint on the API
 */
Router.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('ok'); 
})

/**
 * Post request for executing a flow on the API
 */
Router.post('/:token', async function (req, res) {
    console.log(`[info] starting github flow for user: ${req.params.token}`);
    FlowHandler.executeFlow(req.params.token, req.body.action, req.body);
    res.status(200).send('ok');
})

export const GithubAction = Router;
