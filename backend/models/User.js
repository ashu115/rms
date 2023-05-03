import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    enrNo: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('user',UserSchema)