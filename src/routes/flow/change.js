import express from "express";
import Auth from "../../classes/Auth.js";
import UserDB from "../../classes/UserDB.js";

//TODO
//Lav endpoint - Modtage post request der så laver det flow på frontend
//Skal have en token med som finder den mail der skal bruges.
//Med den mail kan vi tilføje det flow til UserDB. 

function flowObjConvert(flowObj) {
    let convertedObj = {
        _id: "",
        platform: flowObj.routes[0].platform,
        platformActions: flowObj.routes[0].platformActions,
        actions: [],
    };
    
    for (let action of flowObj.actions) {
        let tempContent = action.content.requiredFields.concat(action.content.optionalFields);
        let tempOptions = action.options.requiredFields.concat(action.options.optionalFields);
        
        convertedObj.actions.push({
            name: action.name,
            action: action.executeAction,
            content: tempContent,
            options: tempOptions,
        })
    }

    return convertedObj;
}

const Router = express.Router();
const authenticator = new Auth;

/**
 * Post request to add flows to the database
 */
Router.post('/', (req,res) => {
    const webpanelObj = req.body;
    console.log(req.headers.authorization);
    authenticator.verify(req.headers.authorization).then((userID) => {
        new UserDB(userID, (user) => {
            user.addFlow(flowObjConvert(webpanelObj.flow), (token) => {
                res.status(200).send(token);
            });
        });
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(401).send(error.message);
    });
})

/**
 * Get request to get existing flows from the database
 */
Router.get('/', (req,res) => {
    const webpanelObj = req.body;
    authenticator.verify(req.headers.authorization).then((userID) => {
        new UserDB(userID, (user) => {
            res.status(200).json(user.getFlows());
        });
    }, (error) => {
        console.log("Failed authenticating " + error.message);
        res.status(401).send(error.message);
    });
})

export const flowChangeRoute = Router;
