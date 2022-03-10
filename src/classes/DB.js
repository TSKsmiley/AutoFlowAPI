import mongoose from 'mongoose';
import {userModel} from '../models/actionModel.js'

export class DB {
  
    static init (cb) {
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(()=>cb());
    }

    static async getFlows(userID){
        const user = await userModel.findById(userID);
        user.flows.then(flows => {return flows;});
    }
}
