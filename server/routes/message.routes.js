import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessages, sendMessages } from "../controllers/message.controller.js";


const router = express.Router();

router.get("/users",isAuthenticated,getAllUsers);
router.get("/:id",isAuthenticated,getMessages);
router.post("/send/:id",isAuthenticated,sendMessages);



export default router;