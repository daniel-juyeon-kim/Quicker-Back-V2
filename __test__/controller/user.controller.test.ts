import { NextFunction, Request, Response } from "express";
import { mock, mockClear } from "jest-mock-extended";

import { UserController } from "../../controllers/user.controller";
import { DuplicatedDataError, NotExistDataError } from "../../database";
import { UserService } from "../../service/user/user.service";
import { HttpResponse } from "../../util/http-response";
import { UserControllerRequestData } from "../../validator/schema/routes/user/user-controller-request-data";

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
  describe("createUser 테스트", () => {
    test("성공하는 테스트", async () => {
      const body: UserControllerRequestData["createUser"] = {
        walletAddress: "문자열",
        name: "문자열",
        email: "temp@gmail.com",
        contact: "01012341234",
        birthDate: "1999/01/01",
      };
      req.body = body;
      service.createUser.mockResolvedValue(undefined);

      await userController.createUser(req as Request, res as Response, next);

      expect(service.createUser).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200));
    });

    test("실패하는 테스트, DuplicatedDataError 던짐", async () => {
      const body: UserControllerRequestData["createUser"] = {
        walletAddress: "문자열",
        name: "문자열",
        email: "temp@gmail.com",
        contact: "01012341234",
        birthDate: "1999/01/01",
      };
      req.body = body;

      const error = new DuplicatedDataError("이미 존재하는 데이터입니다.");
      service.createUser.mockRejectedValueOnce(error);

      await userController.createUser(req as Request, res as Response, next);

      expect(service.createUser).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("getUserName 테스트", () => {
    test("통과하는 테스트", async () => {
      const query: UserControllerRequestData["getUserName"] = { walletAddress: "0x123" };
      req.query = query;
      const mockReturnData = { name: "John Doe" };
      service.findUserNameByWalletAddress.mockResolvedValueOnce(mockReturnData);

      await userController.getUserName(req as Request, res as Response, next);

      expect(service.findUserNameByWalletAddress).toHaveBeenCalledWith(req.query.walletAddress);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, mockReturnData));
    });

    test("실패하는 테스트, 존재하지 않는 지갑주소일 경우 NotExistDataError를 호출해야 한다", async () => {
      const query: UserControllerRequestData["getUserName"] = { walletAddress: "0x123" };
      req.query = query;
      const error = new NotExistDataError("데이터가 존재하지 않습니다.");
      service.findUserNameByWalletAddress.mockRejectedValueOnce(error);

      await userController.getUserName(req as Request, res as Response, next);

      expect(service.findUserNameByWalletAddress).toHaveBeenCalledWith(req.query.walletAddress);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("updateUserImageId 테스트", () => {
    test("통과하는 테스트", async () => {
      const body: UserControllerRequestData["updateUserImageId"] = {
        walletAddress: "0x123",
        imageId: "image123",
      };
      req.body = body;
      service.updateUserImageId.mockResolvedValueOnce(undefined);

      await userController.updateUserImageId(req as Request, res as Response, next);

      expect(service.updateUserImageId).toHaveBeenCalledWith(req.body);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200));
    });

    test("실패하는 테스트, 존재하지 않는 유저일 경우 NotExistDataError를 호출해야 한다", async () => {
      const body: UserControllerRequestData["updateUserImageId"] = {
        walletAddress: "0x123",
        imageId: "image123",
      };
      req.body = body;
      const error = new NotExistDataError("유저가 존재하지 않습니다.");
      service.updateUserImageId.mockRejectedValueOnce(error);

      await userController.updateUserImageId(req as Request, res as Response, next);

      expect(service.updateUserImageId).toHaveBeenCalledWith(req.body);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("getUserImageId 테스트", () => {
    test("통과하는 테스트", async () => {
      const query: UserControllerRequestData["getUserImageId"] = { walletAddress: "0x123" };
      req.query = query;
      const mockImageId = { imageId: "image123" };
      service.findUserImageId.mockResolvedValueOnce(mockImageId);

      await userController.getUserImageId(req as Request, res as Response, next);

      expect(service.findUserImageId).toHaveBeenCalledWith(req.query.walletAddress);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, mockImageId));
    });

    test("실패하는 테스트, 존재하지 않는 유저의 이미지일 경우 NotExistDataError를 호출해야 한다", async () => {
      const query: UserControllerRequestData["getUserImageId"] = { walletAddress: "0x123" };
      req.query = query;
      const error = new NotExistDataError("이미지 데이터가 존재하지 않습니다.");
      service.findUserImageId.mockRejectedValueOnce(error);

      await userController.getUserImageId(req as Request, res as Response, next);

      expect(service.findUserImageId).toHaveBeenCalledWith(req.query.walletAddress);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
