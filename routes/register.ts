import express from "express";
import { userController } from "../controllers";
import { validate } from "../validator";
import { postMethodSchema } from "../validator/schema/routes/register";

const router = express.Router();

// User : {
//     id!: string; // 추후 생성 값
//     wallet_address!: string;
//     name!: string;
//     email!: string;
//     contact!: string;
// }

// Birthday: {
//     id!: string; // 추후 생성 값
//     year!: number;
//     month!: number;
//     date!: number;
// }

// POST /register
router.post("/", validate(postMethodSchema, ["body"]), userController.register);

export default router