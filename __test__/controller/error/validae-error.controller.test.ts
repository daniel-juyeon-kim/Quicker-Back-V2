import { Response } from "express";
import { ValidateErrorController } from "../../../controllers/error/validation/validae-error.controller";
import { HttpErrorResponse } from "../../../util/http-response";
import { ValidationLayerError } from "../../../validator";

const date = new Date(2000, 0, 1);
jest.spyOn(global, "Date").mockImplementation(() => date);

const controller = new ValidateErrorController();
let res: Partial<Response>;

beforeEach(() => {
  res = { send: jest.fn() };
});
describe("ValidateErrorController", () => {
  test("에러 처리, response 400", () => {
    const error = new ValidationLayerError({
      type: "field",
      location: "body",
      path: "",
      msg: "에러 메시지",
    });

    controller.handle({ error, res: res as Response, date: date });

    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(400, error.error));
  });
});
