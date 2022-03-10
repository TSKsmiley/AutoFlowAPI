import { Router } from "express"



Router.get('/', (req, res) => {
  res.send("Hello World!");
})

export const actionRouter= Router;
