import express from "express";
const Router = express.Router();

Router.post('/', (req, res) => {
  console.log(req.body + req.ip);
  res.status(200).send('ok'); 
})

export const webpanelHandler = Router;
