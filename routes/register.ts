import express from "express";

import { userController } from "../controllers";
import { validate } from "../validator";
import { postRegisterSchema } from "../validator/schema/routes/register";

const router = express.Router();

router.post("/", validate(postRegisterSchema, ["body"]), userController.registerUser);

export default router;
