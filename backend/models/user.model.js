import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String, 
        reqiured: true, 
        unique: true, 


    }, 
    email: {
        type: String, 
        reqiured: true, 
        unique: true, 
    }, 
    password: {
        type: String, 
        reqiured: true, 
    }, 
    image: {
        type: String,
        default: ""
    }, 
    searchHistory: {
        type: Array, 
        default: []
    }
});

export const User = mongoose.model ('User', userSchema);

