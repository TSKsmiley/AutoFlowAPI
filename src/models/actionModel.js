import mongoose from 'mongoose';
const { Schema } = mongoose;

const flow = new Schema({
    platform: String,
    platformAction: String,
    action: [action]
});

const action = new Schema({
    name: String,
    action:  String,
    content: String
});

const userSchema = new Schema({
    _id: { type: String, required: true },
    flows: [flow],
})

export const userModel = mongoose.model('user', userSchema);