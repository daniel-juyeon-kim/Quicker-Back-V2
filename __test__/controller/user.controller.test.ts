import { NextFunction, Request, Response } from "express";
import { mock, mockClear } from "jest-mock-extended";

import { UserController } from "../../controllers/user.controller";
import { DuplicatedDataError, NotExistDataError } from "../../database";
import { UserService } from "../../service/user/user-service";
import { HttpResponse } from "../../util/http-response";
import { UserControllerRequestData } from "../../validator/schema/routes/user";

const service = mock<UserService>();
const userController = new UserController(service);

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  mockClear(service);
  req = {
    body: {},
    query: {},
  };
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("UserController 테스트", () => {
  describe("registerUser 테스트", () => {
    test("성공하는 테스트", async () => {
      const body: UserControllerRequestData["registerUser"] = {
        User: {
          wallet_address: "문자열",
          name: "문자열",
          email: "temp@gmail.com",
          contact: "01012341234",
        },
        Birthday: {
          year: 1999,
          month: 1,
          date: 1,
        },
      };
      req.body = body;
      service.registerUser.mockResolvedValue(undefined);

      await userController.registerUser(req as Request, res as Response, next);

      expect(service.registerUser).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200));
    });

    test("실패하는 테스트, DuplicatedDataError 던짐", async () => {
      const body: UserControllerRequestData["registerUser"] = {
        User: {
          wallet_address: "문자열",
          name: "문자열",
          email: "temp@gmail.com",
          contact: "01012341234",
        },
        Birthday: {
          year: 1999,
          month: 1,
          date: 1,
        },
      };
      req.body = body;

      const error = new DuplicatedDataError("이미 존재하는 데이터입니다.");
      service.registerUser.mockRejectedValueOnce(error);

      await userController.registerUser(req as Request, res as Response, next);

      expect(service.registerUser).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("findUserNameByWalletAddress 테스트", () => {
    test("통과하는 테스트", async () => {
      const query: UserControllerRequestData["findUserNameByWalletAddress"] = { walletAddress: "0x123" };
      req.query = query;
      const mockReturnData = { name: "John Doe" };
      service.findUserNameByWalletAddress.mockResolvedValueOnce(mockReturnData);

      await userController.findUserNameByWalletAddress(req as Request, res as Response, next);

      expect(service.findUserNameByWalletAddress).toHaveBeenCalledWith(req.query.walletAddress);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, mockReturnData));
    });

    test("실패하는 테스트, 존재하지 않는 지갑주소일 경우 NotExistDataError를 호출해야 한다", async () => {
      const query: UserControllerRequestData["findUserNameByWalletAddress"] = { walletAddress: "0x123" };
      req.query = query;
      const error = new NotExistDataError("데이터가 존재하지 않습니다.");
      service.findUserNameByWalletAddress.mockRejectedValueOnce(error);

      await userController.findUserNameByWalletAddress(req as Request, res as Response, next);

      expect(service.findUserNameByWalletAddress).toHaveBeenCalledWith(req.query.walletAddress);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("putUserImageId 테스트", () => {
    test("통과하는 테스트", async () => {
      const body: UserControllerRequestData["putUserImageId"] = {
        walletAddress: "0x123",
        imageId: "image123",
      };
      req.body = body;
      service.putUserImageId.mockResolvedValueOnce(undefined);

      await userController.putUserImageId(req as Request, res as Response, next);

      expect(service.putUserImageId).toHaveBeenCalledWith(req.body);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200));
    });

    test("실패하는 테스트, 존재하지 않는 유저일 경우 NotExistDataError를 호출해야 한다", async () => {
      const body: UserControllerRequestData["putUserImageId"] = {
        walletAddress: "0x123",
        imageId: "image123",
      };
      req.body = body;
      const error = new NotExistDataError("유저가 존재하지 않습니다.");
      service.putUserImageId.mockRejectedValueOnce(error);

      await userController.putUserImageId(req as Request, res as Response, next);

      expect(service.putUserImageId).toHaveBeenCalledWith(req.body);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // 성공 테스트
  describe("getUserImageId 테스트", () => {
    test("통과하는 테스트", async () => {
      const query: UserControllerRequestData["getUserImageId"] = { walletAddress: "0x123" };
      req.query = query;
      const mockImageId = { imageId: "image123" };
      service.getUserImageId.mockResolvedValueOnce(mockImageId);

      await userController.getUserImageId(req as Request, res as Response, next);

      expect(service.getUserImageId).toHaveBeenCalledWith(req.query.walletAddress);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, mockImageId));
    });

    test("실패하는 테스트, 존재하지 않는 유저의 이미지일 경우 NotExistDataError를 호출해야 한다", async () => {
      const query: UserControllerRequestData["getUserImageId"] = { walletAddress: "0x123" };
      req.query = query;
      const error = new NotExistDataError("이미지 데이터가 존재하지 않습니다.");
      service.getUserImageId.mockRejectedValueOnce(error);

      await userController.getUserImageId(req as Request, res as Response, next);

      expect(service.getUserImageId).toHaveBeenCalledWith(req.query.walletAddress);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
