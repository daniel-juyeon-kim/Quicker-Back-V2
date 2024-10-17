import { DataBaseError } from "../../../database";
import { ValidationLayerError } from "../../../validator";
import { RouterError } from "../../util/router-error";

export type ErrorTypes = RouterError | ValidationLayerError | DataBaseError | unknown;
