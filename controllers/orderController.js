import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
    const data = req.body;
    const orderInfo = {
        orderedItems : [],
    }

    // Attach user email from authenticated request
    if(req.user==null){
        res.status(401).json({
            message : "Unauthorized User"
        });
        return;
    }
    orderInfo.email = req.user.email;   // Assuming req.user contains authenticated user's info

    const lastOrder = await Order.find().sort({ orderDate : -1}).limit(1);
    if(lastOrder.length == 0) {
        orderInfo.orderId = "ORD0001";
    }else{
        const lastOrderId = lastOrder[0].orderId;                              // "ORD0023"
        const lastOrderNumberInString = lastOrderId.replace("ORD","");         // "0023"
        const lastOrderNumber = parseInt(lastOrderNumberInString);             // 23
        const currentOrderNumber = lastOrderNumber + 1;                        // 24
        const formattedNumber = String(currentOrderNumber).padStart(4,'0');    // "0024"
                     
        orderInfo.orderId = "ORD" + formattedNumber;                           // "ORD0024"
        
    }

    let oneDayCost = 0;

    //this loop fetches product details for each ordered item and constructs the orderedItems array
    for(let i=0; i<data.orderedItems.length; i++){
        try{
            const product = await Product.findOne({key : data.orderedItems[i].key});
            if(product == null){
                res.status(404).json({
                    message : "Product with key "+data.orderedItems[i].key+" not found"
                });
                return;
            }
            if(product.availability == false){
                res.status(400).json({
                    message : "Product with key "+data.orderedItems[i].key+" is currently unavailable"
                });
                return;
            }


            orderInfo.orderedItems.push({
                product : {
                    key : product.key,
                    name : product.name,
                    image : product.image[0],   // Assuming first image as thumbnail
                    price : product.price,
                },
                quantity : data.orderedItems[i].qty,
            });
            
            // Calculate one day cost
            oneDayCost += product.price * data.orderedItems[i].qty;

        }catch(e){
            console.error("Error fetching product details for order creation:", e);
            res.status(500).json({
                message : "Failed to create order due to server error."
            });
            return;
        }
    }

    // Set rental details
    orderInfo.days = data.days;
    orderInfo.startingDate = data.startingDate;
    orderInfo.endingDate = data.endingDate;
    orderInfo.totalAmount = oneDayCost * data.days;

    // Save the order to the database
    try{
        const newOrder = new Order(orderInfo);
        const result = await newOrder.save();
        res.json({
            message : "Order created successfully",
            order:result
        });
    }catch(e){
        console.log(e)
        res.status(500).json({
            message : "Failed to create order due to server error."
            
        });
        return;
    }


}

//test comment