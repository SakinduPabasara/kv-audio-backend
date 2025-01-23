import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();      //This is typically used to organize your code by grouping related routes (e.g., all user-related routes) and then connecting them to the main app.

userRouter.post("/",registerUser);         //user කෙනෙක්ව db එකෙ save කරන්න දාන්න ඕනි post request එකක්.

userRouter.post("/login",loginUser);


export default userRouter;                //index.js file එකට export කිරීම.