import { userController } from "../controllers"
import { validate } from "../validator"
import express from "express";
import { getMethodSchema, putMethodSchema } from "../validator/schema/routes/user/image/id";

const router = express.Router();

// GET /user/image/id
router.get('/', validate(getMethodSchema, ["query"]), userController.getUserImageId)

// body : {
//   walletAddress: string,
//   imageId: string
// }

// PUT /user/image/id
router.put('/', validate(putMethodSchema, ["body"]), userController.putUserImageId)

export default router;