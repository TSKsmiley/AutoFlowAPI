import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Main Schema for the the token database
 */
const tokenSchema = new Schema({
    _id: { type: String, required: true },
    userID: String,
})

export const tokenModel = mongoose.model('token', tokenSchema);
