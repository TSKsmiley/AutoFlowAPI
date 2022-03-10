import express from "express";
const Router = express.Router();

Router.post('/', (req, res) => {
  const webpanelObj = req.body;

  webpanelObj.token;

  res.status(200).send('ok'); 
})

export const webpanelHandler = Router;
