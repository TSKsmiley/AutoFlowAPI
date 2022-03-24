import TokenDB from './TokenDB.js';
import UserDB from './UserDB.js';

export default class FlowHandler{
    static async executeFlow(token) {
        TokenDB.getUser(token, (user) => {
            const flow = user.getFlow(token);
            console.log(flow);
        });
}
