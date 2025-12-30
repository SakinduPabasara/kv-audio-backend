import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();   // Create a router for order-related routes

orderRouter.post("/", createOrder);   // Define a POST route for creating orders

export default orderRouter;  // Export the router to be used in the main application