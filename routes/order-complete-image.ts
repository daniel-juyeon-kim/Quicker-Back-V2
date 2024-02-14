import express from "express";
import multer from "multer";

import { orderController } from "../controllers";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// GET /order/image/complete
router.get("/", orderController.getImage);

// POST /order/image/complete
router.post("/", upload.single("uploadImage"), orderController.postImage);

export default router;