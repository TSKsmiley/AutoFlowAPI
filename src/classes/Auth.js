import { OAuth2Client } from "google-auth-library";

/**
 * Class for handling the authentication of users
 */
export default class Auth{
    /**
     * Function for validating a token and returning the corrosponding userID
     * @param {String} token 
     * @returns {String} userID
     */
    async verify(token){
        const client = new OAuth2Client(process.env.GOOGLE_TOKEN);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_TOKEN,
        });
        const payload = ticket.getPayload();
        const userid = payload.email;
        
        return userid;
    }
}
