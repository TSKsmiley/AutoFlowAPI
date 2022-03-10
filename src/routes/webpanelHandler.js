import express from "express";
const Router = express.Router();

Router.post('/', (req, res) => {
  const webpanelObj = req.body;

  req

  res.status(200).send('ok'); 
})

export const webpanelHandler = Router;
