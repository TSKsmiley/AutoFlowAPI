import express from "express";
import bodyParser from "body-parser";
import { flowChangeRoute } from "./flow/change.js";
import { flowInfoRoute } from "./flow/info.js";

const wpHandler = express();

/**
 * Setting up routes for the webpanel
 */
wpHandler.use('/', bodyParser.json(), flowChangeRoute);
wpHandler.use('/info', bodyParser.json(), flowInfoRoute);

export const webpanelHandler = wpHandler;
