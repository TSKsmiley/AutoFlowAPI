import { Router } from "express"

Router.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).send('ok'); 
})

export const webpanelHandler = Router;
