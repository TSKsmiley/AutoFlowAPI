import mongoose from 'mongoose';
const { Schema } = mongoose;

const tokenSchema = new Schema({
    _id: { type: String, required: true },
    userId: String,
    flowId: String,
})

export const tokenModel = mongoose.model('token', tokenSchema);

