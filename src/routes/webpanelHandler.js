import express from "express";
import { OAuth2Client } from "google-auth-library";

const Router = express.Router();

Router.post('/', (req, res) => {
  const webpanelObj = req.body;
  
  verify(webpanelObj.token).then((token) => {
    console.log(token);
  }, (error) => {
    console.log("Failed authenticating: " + error.message);
  });

    res.status(200).send('ok'); 
  })

export const webpanelHandler = Router;

const client = new OAuth2Client(process.env.GOOGLE_TOKEN);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_TOKEN,  // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  const userid = ticket.getUserId();
  return userid;
}
