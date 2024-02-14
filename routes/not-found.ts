import express from "express";
import { HTTPError } from "../types/http-error";
const router = express.Router();


router.all("/", (req, res, next) => {
    const error : HTTPError = new Error('404 Not Found')
    error.status = 404
    next(error)
})

export default router;