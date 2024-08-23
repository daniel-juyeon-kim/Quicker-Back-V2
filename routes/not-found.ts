import express from "express";
import { HttpErrorResponse } from "../util/http-response";
const router = express.Router();

router.all("/", (_, __, next) => {
  next(new HttpErrorResponse(404));
});

export default router;
