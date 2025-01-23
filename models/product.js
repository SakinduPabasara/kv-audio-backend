import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true 
    },
    description : {
        type : String,
        required : true
    },
})

                                                           //db එකේ collection එකයි, අපේ backend code එකයි අතර connection එක "Product" (product model) එකෙන් හදයි.
const Product = mongoose.model("Product",productSchema);   //product model එක සෑදීම ("save වෙන්න ඕනි collection එකේ නම", හදාගත්ත structure එක)

export default Product;