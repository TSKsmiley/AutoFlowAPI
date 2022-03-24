import mongoose from 'mongoose';
import {tokenModel} from '../models/tokenModel.js';
import UserDB from './UserDB.js';
import {randomUUID} from 'crypto';

export default class TokenDB {
    /**
     * Get functions for getting information on flow or user associated to the specific token.
     */

    /**
     * Function for returning the userID based on a token
     * @param {String} token 
     * @returns userID
     */
    static async getUserID(token = String){
        const tempToken = await tokenModel.findById(token);
        return tempToken.userID;
    }

    /**
     * Function for returning an user obejct based on a token
     * @param {String} token 
     * @returns UserDB object
     */
    static async getUser(token = String){
        const tempToken = await tokenModel.findById(token);
        new UserDB(tempToken.userID,(user)=>{
            return user
        });
    }

    /**
     * Function for getting flow based on token
     * @param {String} token 
     * @returns flow
     */
    static async getFlow(token = String, callBack){
        const tokenDoc = await tokenModel.findById(token);
        console.log(tokenDoc.userID);
        new UserDB(tokenDoc.userID, (user) =>{
            const flow = user.getFlow(token);
            callBack(flow);
        });
    }

    /**
     * Delete function for DELETE specific token
     * @param {String} token 
     */
    static async deleteToken(token = String){
        tokenModel.findByIdAndDelete(token, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", docs);
            }
        });
    }

    /**
     * Generate function for generating a new token for a new flow
     * @param {String} userID 
     * @returns token
     */
    static async genrateToken(userID  = String) {
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
