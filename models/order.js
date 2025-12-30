import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    orderDate : {
        type : Date,
        required : true,
        default : Date.now
    },
    orderedItems : {
        type : [
            { 
                product : {
                    key : {
                        type : String,
                        required : true
                    },
                    name : {
                        type : String,
                        required : true
                    },
                    image : {
                        type : String,  
                        required : true
                    },
                    price : {
                        type : String,
                        required : true
                    },
                },
                quantity : {
                    type : Number,
                    required : true,
                }
            }
        ],
        required : true
    },
    days : {
        type : String,
        required : true
    },
    startingDate : {
        type : Date,
        required : true
    },
    endingDate : {
        type : Date,
        required : true
    },
    isApproved : {
        type : Boolean,
        required : true,
        default : false
    },
    totalAmount : {
        type : String,
        required : true
    },
})

const Order = mongoose.model("Orderss",orderSchema);

export default Order;