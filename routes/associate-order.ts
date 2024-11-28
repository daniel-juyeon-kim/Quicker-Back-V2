import express from "express";
import { adminController } from "../controllers";

const router = express.Router();

router.post("/single", adminController.deleteAssociateOrder).post("/multi", adminController.deleteAssociateOrders);

export default router;
