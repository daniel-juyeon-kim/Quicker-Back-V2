import express from "express";

import ImageIdRouter from "./user-image-id"

import { userController } from "../controllers";
import { validate } from "../validator";
import { getMethodSchema } from "../validator/schema/routes/user/name";

const router = express.Router();

// GET /user/name
router.get("/name", validate(getMethodSchema, ["query"]), userController.findUserNameByWalletAddress);

router.use('/image/id', ImageIdRouter)
export default router