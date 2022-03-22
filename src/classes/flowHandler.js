import Token from './Token'
import UserDB from './UserDB'

export default class FlowHandler{
    static async executeFlow(token, response) {
        const tokenInfo = Token.get(token);
        let flowArray = DB.getFlows(tokenInfo.userID);
    }
}
