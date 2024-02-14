import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Application } from "express";

import { customMorgan } from "./middlewares/custom-morgan";
import { cronJob, folder } from "./middlewares";

folder.createLogFolder()
cronJob

const loader = {
  
  init : async (app: Application) => {

    app.use(customMorgan())
    app.use(compression());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  
    return app;
  }
} 

export default loader