//----------------------------user.js (model එක)------------------------------

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    type : {                      //(role / position)
        type : String,
        required : true,
        default : "customer",
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    whatsApp : {
        type : String,
        required : true
    }

});

const User = mongoose.model("User",userSchema);  //user model එක සෑදීම ("save වෙන්න ඕනි collection එකේ නම", හදාගත්ත structure එක)
                                                 //db එකේ collection එකයි, අපේ backend code එකයි අතර connection එක හදන්නෙ "User" (user model) එකෙන්.

export default User;