import express from "express";

import { userController } from "../controllers";
import { validate } from "../validator";
import { getUserImageIdSchema, getUserNameSchema, putUserImageIdSchema } from "../validator/schema/routes/user";

const router = express.Router();

// GET /user/name

// query {
//   walletAddress: string
// }

// Response

// code: 200,
// message: OK,
// body: {
//  name: string
// }
router.get("/name", validate(getUserNameSchema, ["query"]), userController.findUserNameByWalletAddress);

// GET /user/image/id

// query {
//   walletAddress: string
// }

// Response

// {
// 	code: 200,
// 	message: OK,
// 	body: {
// 		imageId: "300" // string
// 	}
// }
router.get("/image/id", validate(getUserImageIdSchema, ["query"]), userController.getUserImageId);

// PUT /user/image/id

// body {
//   walletAddress: string,
//   imageId: "300" // string
// }

// Response
// {
// 	code: 200,
// 	message: OK,
// }
router.put("/image/id", validate(putUserImageIdSchema, ["body"]), userController.putUserImageId);

export default router;
