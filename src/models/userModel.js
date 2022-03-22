import mongoose from 'mongoose';
const { Schema } = mongoose;

const action = new Schema({
    name: String,
    action:  String,
    content: String
});

const flow = new Schema({
    _id: { type: String, required: true },
    platform: String,
    platformAction: String,
    actions: [action]
});

const userSchema = new Schema({
    _id: { type: String, required: true },
    flows: [flow],
})

userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

export const userModel = mongoose.model('user', userSchema);

