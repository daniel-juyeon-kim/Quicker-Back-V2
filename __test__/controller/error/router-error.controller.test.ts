import { Response } from "express";
import { RouterErrorController } from "../../../controllers/error/router/router-error.controller";
import { UrlNotExistError } from "../../../controllers/util/url-not-exist-error";
import { HttpErrorResponse } from "../../../util/http-response";

const date = new Date();
jest.spyOn(global, "Date").mockImplementation(() => date);

const controller = new RouterErrorController();
let res: Partial<Response>;

beforeEach(() => {
  res = {
    send: jest.fn(),
  };
});
describe("RouterErrorController", () => {
  test("UrlNotExistError 에러 처리, 404 에러 전송", () => {
    const error = new UrlNotExistError("URL not found");

    controller.handle({ error, res: res as Response, date: date });

    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(404));
  });
});
