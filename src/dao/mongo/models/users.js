import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = mongoose.Schema({
    name: { //github
        type: String,
        minLength: 3,
    },
    username: { //github
        type: String,
        minLength: 3,
    },
    first_name: {
        type: String,
        minLength: 3,
        require: true
    },
    last_name: {
        type: String,
        minLength: 3,
        require: true
    },
    full_name: { //DTO
        type: String,
        minLength: 3,
        require: true
    },
    email: {
        type: String,
        minLength: 3,
        unique: true,
        require: true
    },
    age: {
        type: Number,
        min: 18,
        require: true
    },
    password: {
        type: String
    },
    role: {
        type:String,
        default:'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        default: null
    }
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;