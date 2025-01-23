import Product from "../models/product.js";

export function addProduct(req,res){
    
    console.log(req.user)

    if(req.user == null){                     //request එකේ user කෙනෙක් ඉන්නවනම් විතරයි product add කරන්න දෙන්නෙ.
        res.status(401).json({
            message : "Please login and try again"
        })
        return                               //මෙතනින් run වෙන එක නවත්තන්නයි, return එකක් දාලා තියෙන්නෙ. නැතිනම් දිගටම run වෙනවා.
    }
    

    if(req.user.type != "admin"){             //user කෙනෙක් හිටියත්, එයාගෙ type එක admin නෙවෙයි නම්
        res.status(403).json({
            message : "You are not athorized to perform this action"
        })
        return
    }

    const data = req.body;
    const newProduct = new Product(data);
    newProduct.save()
    .then(()=>{
        res.json({message:"Product added Successfully"});
    })
    .catch((error)=>{
        res.status(500).json({error:"Product addition failed"});
    });
}