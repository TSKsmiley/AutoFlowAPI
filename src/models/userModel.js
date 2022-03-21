import mongoose from 'mongoose';
const { Schema } = mongoose;

const action = new Schema({
    name: String,
    action:  String,
    content: String
});

const flow = new Schema({
    platform: String,
    platformAction: String,
    token: String,
    actions: [action]
});

const userSchema = new Schema({
    _id: { type: String, required: true },
    flows: [flow],
})

export const userModel = mongoose.model('user', userSchema);

