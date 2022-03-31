import express from "express";
import bodyParser from "body-parser";
import Auth from "../classes/Auth.js";
import { flowRoute } from "./flow/flow.js";

const wpHandler = express();

wpHandler.use('/flow', bodyParser.json(), flowRoute);

export const webpanelHandler = wpHandler;
