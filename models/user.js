import mongoose from "mongoose";

//save වෙන data එකේ structure එක
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "customer"
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    
});

const User = mongoose.model("User",userSchema)   //mongo DB එකේ collection එකයි, backend එකයි අතර connection එක හදනවා.

export default User;