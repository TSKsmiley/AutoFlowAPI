import mongoose from 'mongoose';
import {tokenModel} from '../models/tokenModel.js';
import UserDB from './UserDB.js';
import {randomUUID} from 'crypto';

/**
 * Class for handling the token database
 */
export default class TokenDB {
    /**
     * Get functions for getting information on flow or user associated to the specific token.
     */

    /**
     * Function for returning the userID based on a token
     * @param {String} token 
     * @param {Function} callback
     * @callback callBack function is called with the userID String
     */
    static getUserID(token = String, callBack = () => {}){
        tokenModel.findById(token)
            .then((tempToken)=>{
                callBack(tempToken.userID);
            });
    }

    /**
     * Function for returning an user obejct based on a token
     * @param {String} token
     * @param {Function} callback
     * @callback callBack function is called with the UserDB object
     */
    static getUser(token = String, callback = () => {}){
        tokenModel.findById(token).then((tempToken) => {
            new UserDB(tempToken.userID,(user)=>{
                callback(user);
            });
        })
    }


    /**
     * Function for getting flow based on token
     * @param {String} token
     * @param {Function} callback
     * @callback callBack function is called with the flow object
     */
    static getFlow(token = String, callBack = () => {}){
        tokenModel.findById(token).then((tokenDoc)=>{
            new UserDB(tokenDoc.userID, (user) =>{
                const flow = user.getFlow(token);
                callBack(flow);
            });
        });
    }

    /**
     * Delete function for DELETE specific token
     * @param {String} token
     * @param {Function} callback
     * @callback callBack function is called with the UserDB object
     */
    static deleteToken(token = String, callBack = ()=>{}){
        tokenModel.findByIdAndDelete(token, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", docs);
                callBack(docs);
            }
        });
    }

    /**
     * Generate function for generating a new token for a new flow
     * @param {String} userID
     * @returns {String} token
     */
    static async genrateToken(userID = String) {
        let uniqueToken = false;
        let token;

        do {
            token = randomUUID();

            if (await tokenModel.findById(token) === null) {
                uniqueToken = true;
            }
        } while (!uniqueToken)
        
        let newToken = new tokenModel({
            _id: token,
            userID: userID,
        });

        newToken.save((err, doc) => {
            if (!err){
                console.log("Succesfully created and added new token");
            }  
            else {
                console.log('Error during token creation and insertion : ' + err);
            }
        });

        return token;
    }
}
