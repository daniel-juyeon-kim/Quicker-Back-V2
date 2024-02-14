import express from "express";
import { userController } from "../controllers";

const router = express.Router();

// GET /user/name
router.get("/name", userController.findUserNameByWalletAddress);
// GET /user/image/id
router.get('/image/id', userController.getUserImageId)
// POST /user/image/id
router.put('/image/id', userController.putUserImageId)

export default router