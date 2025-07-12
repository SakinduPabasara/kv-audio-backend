import express from "express";
import { addReview, approveReview, deleteReview, getReviews } from "../controllers/reviewController.js";


const reviewRouter = express.Router();   // Create a new router instance

reviewRouter.post("/",addReview)    // Define a POST route for adding reviews
reviewRouter.get("/",getReviews)    // Define a GET route for retrieving reviews
reviewRouter.delete("/:email",deleteReview)
reviewRouter.put("/approve/:email",approveReview)  // Define a PUT route for approving reviews based on email



// reviewRouter.get("/approved",(req,res)=>{
//     console.log("This is approved route")
// })

// reviewRouter.get("/:email", (req, res) => {
//   console.log("This is email route");
// });


export default reviewRouter;