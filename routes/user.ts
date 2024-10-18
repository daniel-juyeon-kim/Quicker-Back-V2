import express from "express";

import { userController } from "../controllers";
import { validate } from "../validator";
import {
  getUserImageIdSchema,
  getUserNameSchema,
  postUserSchema,
  putUserImageIdSchema,
} from "../validator/schema/routes/user";

const router = express.Router();

// POST /user
router.post("/", validate(postUserSchema, ["body"]), userController.postUser);

// GET /user/name
router.get("/name", validate(getUserNameSchema, ["query"]), userController.findUserNameByWalletAddress);

// GET /user/image/id
router.get("/image/id", validate(getUserImageIdSchema, ["query"]), userController.getUserImageId);

// PUT /user/image/id
router.put("/image/id", validate(putUserImageIdSchema, ["body"]), userController.putUserImageId);

export default router;
