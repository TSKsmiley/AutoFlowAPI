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

const userSchema = new Schema({
    _id: { type: String, required: true },
    actions: [actionSchema],
})

export const userModel = mongoose.model('user', userSchema);