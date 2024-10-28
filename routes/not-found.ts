import express from "express";
import { HttpErrorResponse } from "../util/http-response";

const router = express.Router();

router.all("/", (_, res, next) => {
  res.send(new HttpErrorResponse(404));
});

export default router;
