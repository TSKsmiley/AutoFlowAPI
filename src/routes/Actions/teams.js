import express from "express";
const r = express.Router();

r.get('/', (req, res) => {
  res.status(200).send("ok");
})

export let teamsRouter= r;
