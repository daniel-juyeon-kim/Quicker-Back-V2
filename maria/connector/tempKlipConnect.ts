import { Request, Response } from "express";
import axios from "axios";

export default {
    getRequestKey: async (req: Request, res: Response) => {
        try {
          const para = req.body;
          console.log("para : ", para);
          const data = await axios.post(
              `https://a2a-api.klipwallet.com/v2/a2a/prepare`
            );
          res.send(data);
        } catch (error) {
          console.log(error)
          res.send(error);
        }
      },
    getRequests: async (req: Request, res: Response) => {
      try {
        const request_key = req.body.request_key;
        console.log("request_key : ", request_key);
        const data = await axios.post(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`
          );
        res.send(data);
      } catch (error) {
        console.log(error)
        res.send(error);
      }
    },
  
  };
  