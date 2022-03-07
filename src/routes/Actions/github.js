import express from "express";
import { request } from "express";

const Router = express.Router();


Router.get('/', (req, res) => {
    console.log(request.body);
  res.status(200).send('ok');
})

Router.post('/', (req, res) => {
    console.log(request.body);
    res.status(200).send('ok');
})

export const githubAction = Router;
