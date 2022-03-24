import TokenDB from './TokenDB'
import UserDB from './UserDB'

export default class FlowHandler{
    static async executeFlow(token, response) {
        const flow = await TokenDB.getFlow(token);
        for (const action of flow.actions) {
            console.log(`here are da vealuesss Name: ${action.name} | action: ${action.action} | content: ${action.content}`);
        }

    }
}
