import { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

// Rate limiter 설정
export const caverLimiter = rateLimit({
  windowMs: 1 * 1000, // 1 seconds
  max: 20, // limit each IP to 50 requests per windowMs
  handler(req: Request, res: Response) {
    res.status(204).json({ errorMsg: "Too many requests" });
  },
});
