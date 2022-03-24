import TokenDB from './TokenDB.js';
import UserDB from './UserDB.js';

export default class FlowHandler{
    static async executeFlow(token) {
        TokenDB.getFlow(token, (flow) => {
            for (const action of flow.actions) {
                console.log(`here are da vealuesss Name: ${action.name} | action: ${action.action} | content: ${action.content}`);
            }
        });
        
    }
}
