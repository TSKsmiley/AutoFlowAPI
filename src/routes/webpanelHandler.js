import express from "express";
import Auth from "../classes/auth";

const Router = express.Router();

Router.post('/', (req, res) => {
  const webpanelObj = req.body;
  let auth = new Auth;
  verify(webpanelObj.token).then((token) => {
    console.log(token);
    res.status(200).send('ok'); 



  }, (error) => {
    console.log("Failed authenticating: " + error.message);
    res.status(400).send(error.message); 
  });

    
  })

export const webpanelHandler = Router;
