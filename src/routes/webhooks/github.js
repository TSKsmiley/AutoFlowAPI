import express from "express";
import 'dotenv/config';
import FlowHandler from "../../classes/FlowHandler.js";

const platformID = "github";

const Router = express.Router();


Router.get('/', (req, res) => {
    console.log(req.body);
    res.status(200).send('ok'); 
})

Router.post('/:userID', async function (req, res) {
    console.log(`[info] starting github flow for user: ${req.params.userID}`);
    console.log(req.body);
    FlowHandler.executeFlow(req.params.userID, req.body.action, req.body);
    res.status(200).send('ok');
})

export const GithubAction = Router;
