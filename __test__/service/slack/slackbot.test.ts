import { SlackBot } from "../../../service/slack/slack-bot";

const failureTestCases = [
  {
    token: undefined,
    channelId: "채널 아이디",
    expectErrorMessage: "[WARN] Invalid Env value, token is undefined",
  },
  {
    token: "토큰",
    channelId: undefined,
    expectErrorMessage: "[WARN] Invalid Env value, channelId is undefined",
  },
  {
    token: "",
    channelId: "채널 아이디",
    expectErrorMessage: "[WARN] Invalid Env value, token is empty string",
  },
  {
    token: "토큰",
    channelId: "",
    expectErrorMessage: "[WARN] Invalid Env value, channelId is empty string",
  },
];

describe("슬랙 봇 객체 생성 시 환경 변수 undefined, 비어있는 string 검증 테스트", () => {
  test("성공", () => {
    expect(() => {
      new SlackBot({ token: "토큰", channelId: "채널 아이디" });
    }).not.toThrow();
  });

  test("실패", () => {
    failureTestCases.forEach((failureTestCase) => {
      expect(() => {
        new SlackBot({ token: failureTestCase.token, channelId: failureTestCase.channelId });
      }).toThrow(failureTestCase.expectErrorMessage);
    });
  });
});
