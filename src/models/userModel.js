import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Schema for defining the structure of each action
 */
const action = new Schema({
    name: String,
    action:  String,
    content: [String],
    options: [String],
});

/**
 * Schema for defining the structure of each flow
 */
const flow = new Schema({
    _id: { type: String, required: true },
    platform: String,
    platformActions: [String],
    actions: [action]
});

/**
 * Schema for defining the structure of each user
 */
const userSchema = new Schema({
    _id: { type: String, required: true },
    flows: [flow],
    logs: [String],
})

/**
 * Function for finding or creating users in the database
 * @param {*} condition 
 * @param {Function} callback 
 * @callback callBack function for handling the result and potential errors
 */
userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

export const userModel = mongoose.model('user', userSchema);
