import express from "express";
import { userController } from "../controllers";
import { validate } from "../validator";
import { postRegisterSchema } from "../validator/schema/routes/register";

const router = express.Router();

// POST /register

// body {
//   User: {
//     wallet_address: string,
//     name: string,
//     email: string,
//     contact: string
//   },
//   Birthday: {
//     year: number,
//     month: number,
//     date: number
//   }
// }

// code: 200,
// message: "OK",
router.post("/", validate(postRegisterSchema, ["body"]), userController.registerUser);

export default router;
