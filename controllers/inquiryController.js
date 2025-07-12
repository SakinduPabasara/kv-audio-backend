import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";

// Function to add a new inquiry    
export async function addInquiry(req, res) {
    try{
        if(isItCustomer(req)){              // Check if the user is a customer
            const data = req.body;          // Get the inquiry data from the request body
            data.email = req.user.email;    // Set the email from the authenticated user
            data.phone = req.user.phone;    // Set the phone from the authenticated user

            let id = 0;

            const inquiries = await Inquiry.find().sort({id:-1}).limit(1);

            if(inquiries.length == 0){
                id = 1;  // If no inquiries exist, start with ID 1
            }else{
                id = inquiries[0].id + 1;  // Increment the last inquiry ID by 1  
            }

            data.id = id;  // Set the ID for the new inquiry

            const newInquiry = new Inquiry(data);
            const response = await newInquiry.save();

            res.json({
                message: "Inquiry added successfully",
                id : response.id
            });
            return;

        }else{
            res.status(403).json({
                message: "You are not authorized to add inquiries"
            });
            return;
        }

    }catch(e){
        res.status(500).json({
            message: "Failed to add inquiry"
        });
    }
}

// Function to get inquiries based on user role
export async function getInquiries(req, res){
    try{
        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({email : req.user.email});
            res.json(inquiries);
            return;
        }else if(isItAdmin(req)){
            const inquiries = await Inquiry.find();
            res.json(inquiries);
            return;
        }else{
            res.status(403).json({
                message: "You are not authorized to view inquiries"
            });
            return;
        }
    }catch(e){
        res.status(500).json({
            message: "Failed to get inquiries"
        });
    }
}

// Function to delete an inquiry
export async function deleteInquiry(req, res) {
    try{
        if(isItAdmin(req)){
            const id = req.params.id;  // Get the inquiry ID from the request parameters

            await Inquiry.deleteOne({id:id});  // Delete the inquiry with the specified ID
            res.json({
                message: "Inquiry deleted successfully"
            })
            return;
        }else if(isItCustomer(req)){
            const id = req.params.id;    // Get the inquiry ID from the request parameters
            
            const inquiry = await Inquiry.findOne({id:id}); // Find the inquiry by ID
            if(inquiry == null){
                res.status(404).json({
                    message: "Inquiry not found"
                });
                return;
            }else{
                if(inquiry.email == req.user.email){
                    await Inquiry.deleteOne({id:id});  // Delete the inquiry if it belongs to the customer
                    res.json({
                        message: "Inquiry deleted successfully"
                    });
                    return;
                }else{
                    res.status(403).json({
                        message: "You are not authorized to perform this action"
                    });
                    return;
                }    
            }

        }else{
            res.status(403).json({
                message: "You are not authorized to perform this action"
            });
            return;
        }

    }catch(e){
        res.status(500).json({
            message: "Failed to delete inquiry"
        });
    }
}

export async function updateInquiry(req, res){
    try{
        if(isItAdmin(req)){
            const id = req.params.id; // Get the inquiry ID from the request parameters
            const data = req.body;    // Get the updated inquiry data from the request body

            await Inquiry.updateOne({id:id},data)
            res.json({
                message: "Inquiry updated successfully"
            });
        }else if(isItCustomer(req)){
            const id = req.params.id; // Get the inquiry ID from the request parameters
            const data = req.body;    // Get the updated inquiry data from the request body

            const inquiry = await Inquiry.findOne({id:id}); // Find the inquiry by ID
            if(inquiry == null){
                res.status(404).json({
                    message: "Inquiry not found"
                });
                return;
            }else{
                if(inquiry.email == req.user.email){
                    

                    await Inquiry.updateOne({id:id},{message : data.message}) // Update the inquiry if it belongs to the customer
                    res.json({
                        message: "Inquiry updated successfully"
                    })
                    return;
                }else{
                    res.status(403).json({
                        message: "You are not authorized to perform this action"
                    });
                    return;
                }
            }
        }else{
            res.status(403).json({
                message: "You are not authorized to perform this action"
            });
            return;
        }

    }catch(e){
        res.status(500).json({
            message: "Failed to update inquiry"
        });
    }
}