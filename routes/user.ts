import express from "express";

import { userController } from "../controllers";
import { validate } from "../validator";
import {
  createUserSchema,
  getUserImageIdSchema,
  getUserNameSchema,
  updateUserImageIdSchema,
} from "../validator/schema/routes/user/user-controller-request-data";

const router = express.Router();

router.post("/", validate(createUserSchema, ["body"]), userController.createUser);

router.get("/name", validate(getUserNameSchema, ["query"]), userController.getUserName);

router.get("/image/id", validate(getUserImageIdSchema, ["query"]), userController.getUserImageId);

router.patch("/image/id", validate(updateUserImageIdSchema, ["body"]), userController.updateUserImageId);

export default router;
