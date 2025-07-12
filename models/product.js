import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true,
        default : "uncategorized"
    },
    category : {
        type : String,
        required : true
    },
    dimensions : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    availability : {
        type : Boolean,
        required : true,
        default : true
    },
    image : {
        type : [String],      // Array of strings to hold multiple image URLs
        required : true,
        default : ["https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"]
    },
})

const Product = mongoose.model("Product",productSchema);

export default Product;