import { NextFunction, Request, Response } from "express";
import { mock, mockClear } from "jest-mock-extended";
import { ChatController } from "../../controllers/chat.controller";
import { NotExistDataError } from "../../database";
import { ChatService } from "../../service/chat/chat.service";
import { HttpResponse } from "../../util/http-response";

const service = mock<ChatService>();
const controller = new ChatController(service);

const date = new Date(2000, 1, 1);

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  mockClear(service);
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("ChatController", () => {
  describe("getRecentMessage()", () => {
    test("통과하는 테스트", async () => {
      req.params = { orderId: "1" };

      const resolveValue = {
        walletAddress: "지갑주소",
        message: "message",
        date,
      };
      service.findRecentMessage.mockResolvedValueOnce(resolveValue);

      await controller.getRecentMessage(req as Request, res as Response, next as NextFunction);

      expect(service.findRecentMessage).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, resolveValue));
    });

    test("실패하는 테스트, 데이터가 존재하지 않음", async () => {
      req.params = { orderId: "1" };

      const error = new NotExistDataError("데이터가 존재하지 않습니다.");

      service.findRecentMessage.mockRejectedValueOnce(error);

      await controller.getRecentMessage(req as Request, res as Response, next as NextFunction);

      expect(service.findRecentMessage).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
