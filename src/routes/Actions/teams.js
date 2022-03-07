import { Router } from "express"


Router.get('/', (req, res) => {
  res.status(200).send("ok");
})

export const teamsRouter= Router;
