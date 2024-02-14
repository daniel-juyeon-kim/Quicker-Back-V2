import express from "express";
import KlaytnCaver from "../klaytnApi/KlaytnCaver";

const router = express.Router();

// 클레이튼 api 연결
router.post("/getAllowance", KlaytnCaver.getAllowance)
router.post("/getOrderList", KlaytnCaver.getOrderList)
router.post("/getOrdersForLatest", KlaytnCaver.getOrdersForLatest)
router.get("/getCommissionRate", KlaytnCaver.getCommissionRate)
router.post("/getOrder", KlaytnCaver.getOrder)
router.post("/getOrders", KlaytnCaver.getOrders)
router.post("/getQkrwBalance", KlaytnCaver.getQkrwBal)
router.post("/getOrdersForState", KlaytnCaver.getOrdersForState)
router.post("/getStakingInfo", KlaytnCaver.getStakingInfo)
router.post("/getQtokenAllowance", KlaytnCaver.getQtokenAllowance)
router.post("/getFeeGovernorRoundLogs", KlaytnCaver.getFeeGovernorRoundLogs)
router.post("/getCurrentFeeGovernorInfo", KlaytnCaver.getCurrentFeeGovernorInfo)
router.post("/getFeeDeligation", KlaytnCaver.getFeeDeligation)
router.post("/hasNftIdList", KlaytnCaver.hasNftIdList)
router.post("/sumOrderPrice", KlaytnCaver.sumOrderPrice)
router.post("/mintNft", KlaytnCaver.mintNft)

export default router;