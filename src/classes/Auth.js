import { OAuth2Client } from "google-auth-library";

export default class Auth{
    async verify(token){
        const client = new OAuth2Client(process.env.GOOGLE_TOKEN);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_TOKEN,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload.email;
        
        return userid;
    }
}
