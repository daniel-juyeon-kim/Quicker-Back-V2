import { WebClient } from "@slack/web-api";

import { mock } from "jest-mock-extended";
import { ErrorMessage, ErrorMessageBotError, SlackBot } from "../../../core";

describe("SlackBot 테스트", () => {
  describe("생성자 함수 검증 테스트", () => {
    test("통과하는 테스트", () => {
      expect(() => {
        const webClient = new WebClient("토큰");
        new SlackBot({ webClient, channelId: "채널 아이디" });
      }).not.toThrow();
    });

    test("실패하는 테스트", () => {
      const webClient = new WebClient("토큰");

      const failFn = () => {
        new SlackBot({ webClient, channelId: undefined });
      };

      expect(failFn).toThrow(Error);
      expect(failFn).toThrow("[WARN] Invalid Env value, channelId is undefined");
    });

    test("실패하는 테스트", () => {
      const webClient = new WebClient();

      const failFn = () => {
        new SlackBot({ webClient, channelId: "채널 아이디" });
      };

      expect(failFn).toThrow(Error);
      expect(failFn).toThrow("slack token이 존재하지 않습니다.");
    });
  });

  describe("sendMessage()", () => {
    test("에러 처리 테스트 ,ErrorMessageBotError", async () => {
      const webClient = mock<WebClient>();
      const slackBot = new SlackBot({ webClient, channelId: "채널 아이디" });

      webClient.chat.postMessage = jest.fn().mockResolvedValueOnce({ ok: false });

      const date = new Date(2000, 1, 1);
      const error = new Error("에러 메시지");

      await expect(slackBot.sendMessage(new ErrorMessage({ date, error }))).rejects.toStrictEqual(
        new ErrorMessageBotError(error),
      );
    });
  });
});
