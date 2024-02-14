import express from "express";
import { userController } from "../controllers";

const router = express.Router();

// POST /register
router.post("/", userController.register);

export default router