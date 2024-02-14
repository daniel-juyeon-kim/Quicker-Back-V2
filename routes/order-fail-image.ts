import express from "express";
import multer from "multer";
import { orderController } from "../controllers";

require("dotenv").config();

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET /order/image/fail
router.get("/", orderController.getFailImage);
// POST /order/image/fail
router.post("/", upload.single("image"), orderController.postFailImage)

export default router;