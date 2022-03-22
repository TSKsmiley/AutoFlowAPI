import mongoose from 'mongoose';
import {tokenModel} from '../models/tokenModel.js';
import UserDB from './UserDB.js';
import {randomUUID} from 'crypto';

export class TokenDB {
    /*
     * Get functions for getting information on flow or user associated to the specific token.
     */
    static async get(token){
        const tempToken = await tokenModel.findById(token);
        return {
            userID: tempToken.userID, 
        };
    }

    static async getUserID(token){
        const tempToken = await tokenModel.findById(token);
        return tempToken.userID;
    }

    static async getUser(token){
        const tempToken = await tokenModel.findById(token);
        return tempToken.userID;
    }

    static async getFlow(token){
        const tempUserID = await tokenModel.findById(token).userID;
        const userDB = new UserDB(tempUserID);

        return userDB.getFlow(token);
    }

    /*
     * Delete function for DELETE specific token
     */
    static async deleteToken(token){
        tokenModel.findByIdAndDelete(token, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", docs);
            }
        });
    }


    /*
     * Generate function for generating a new token for a new flow
     */
    static async genrateToken(userID) {
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
