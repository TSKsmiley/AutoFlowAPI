import express from "express";
import Auth from "../../classes/Auth.js";
import UserDB from "../../classes/UserDB.js";

/**
 * Function to convert the incoming flow-objects to objects that are structured the same way
 * as in the database, making it usable for the API.
 * @param {Object} flowObj
 * @returns {Object} Restructured flow object
 */
function flowObjConvert(flowObj) {
    try {
        let convertedObj = {
            _id: "",
            platform: flowObj.routes[0].platform,
            platformActions: flowObj.routes[0].platformActions,
            actions: [],
        };
        
        for (let action of flowObj.actions) {
            let tempContent = [];
            if (!action.content.requiredFields) tempContent.concat(action.content.requiredFields); 
            if (!action.content.optionalFields) tempContent.concat(action.content.optionalFields);

            let tempOptions = [];
            if (!action.options.requiredFields) tempOptions.concat(action.options.requiredFields);
            if (!action.options.optionalFields) tempOptions.concat(action.options.optionalFields);
            
            convertedObj.actions.push({
                name: action.name,
                action: action.executeAction,
                content: tempContent,
                options: tempOptions,
            })
        }
        return convertedObj;

    } catch (e) { 
        throw("Invalid object input: faild object conversion")
    }
}

// Creating object for handeling routes.
const Router = express.Router();

/**
 * Post request to add flows to the database
 */
Router.post('/', (req,res) => {
    const body = req.body;
    console.log(req.headers.authorization);
    Auth.verify(req.headers.authorization).then((userID) => {
        new UserDB(userID, (user) => {
            try {
                user.addFlow(flowObjConvert(body.flow), (token) => {
                    res.status(200).json({token: token});
                });
            } catch (e) {
                console.log("[error] Encountered an error: " + e);
                res.status(400).send(e); // http status code 400: Bad request
            }
        });
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(401).send(error.message); // http status code 401: Unauthorized
    });
})

/**
 * Get request to get existing flows from the database
 */
Router.get('/', (req,res) => {
    Auth.verify(req.headers.authorization).then((userID) => {
        new UserDB(userID, (user) => {
            res.status(200).json(user.getFlows()); // http status code 200: OK
        });
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(401).send(error.message); // http status code 401: Unauthorized
    });
})

export const flowChangeRoute = Router;
