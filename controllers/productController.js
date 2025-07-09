import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

// Add a new product
export async function addProduct(req,res){

    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return    // මෙතෙනදී return කරන්නෙ, function එකෙන් ඉවත් වෙන්න. එහෙම නැති උනොත්, code එක ඉදිරියට execute වෙනවා දිගටම.
    }
    if(req.user.role !="admin"){
        res.status(403).json({
            message : "You are not authorized to  perform this action"
        })
        return
    }

    const data = req.body;
    const newProduct = new Product(data);
    try{
        await newProduct.save();
        res.json({
            message : "Product registered successfully"
        })
    }catch(error){
        res.status(500).json({
            error : "Product rgistration failed"
        })
    }
}

// Get all products or available products
export async function getProducts(req,res){
    
    try{

        if(isItAdmin(req)){
            const products = await Product.find();
            res.json(products);
            return;
        }else{
            const products = await Product.find({availability : true});
            res.json(products);
            return;
        }
        
    }catch(e){
        res.status(500).json({
            message : "Failed to get products"
        })
    }
}

// Update a product
export async function updateProduct(req,res){
    try{
        if(isItAdmin(req)){

            const key = req.params.key;

            const data = req.body;

            await Product.updateOne({key:key},data)

            res.json({
                message : "Product updated successfully"
            })
            return;

        }else{
            res.status(403).json({
                message : "You are not authorized to perform this action"
            })
            return;
        }
    }catch(e){
        res.status(500).json({
            message : "Failed to update products"
        })
    }
}

// Delete a product
export async function deleteProduct(req,res){
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            await Product.deleteOne({key:key})
            res.json({
                message : "Product deleted successfully"
            })
        }else{
            res.status(403).json({
                message : "You are not authorized to perform this action"
            })
            return;
        }
    }catch(e){
        res.status(500).json({
            message : "Failed to delete product"
        })
    }
}
