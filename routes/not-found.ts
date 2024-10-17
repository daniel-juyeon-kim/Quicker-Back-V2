import express from "express";
import { UrlNotExistError } from "../controllers/util/url-not-exist-error";
const router = express.Router();

router.all("/", (_, __, next) => {
  const error = new UrlNotExistError();
  next(error);
});

export default router;
