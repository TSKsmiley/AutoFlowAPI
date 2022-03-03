import mongoose from 'mongoose';
const { Schema } = mongoose;

const actionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    }
});

export const actionModel = mongoose.model('action', actionSchema);