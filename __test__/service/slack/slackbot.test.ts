import { SlackBot } from "../../../service/slack/slack-bot";

const 실패_케이스들 = [
  {
    토큰: undefined,
    채널_아이디: "채널 아이디",
    예상_에러_메시지: "[WARN] Invalid Env value, token is undefined",
  },
  {
    토큰: "토큰",
    채널_아이디: undefined,
    예상_에러_메시지: "[WARN] Invalid Env value, channelId is undefined",
  },
  {
    토큰: "",
    채널_아이디: "채널 아이디",
    예상_에러_메시지: "[WARN] Invalid Env value, token is empty string",
  },
  {
    토큰: "토큰",
    채널_아이디: "",
    예상_에러_메시지: "[WARN] Invalid Env value, channelId is empty string",
  },
];

describe("슬랙 봇 객체 생성 시 환경 변수 undefined, 비어있는 string 검증 테스트", () => {
  test("성공", () => {
    expect(() => {
      new SlackBot({ token: "토큰", channelId: "채널 아이디" });
    }).not.toThrow();
  });

  test("실패", () => {
    실패_케이스들.forEach((실패_케이스) => {
      expect(() => {
        new SlackBot({ token: 실패_케이스.토큰, channelId: 실패_케이스.채널_아이디 });
      }).toThrow(실패_케이스.예상_에러_메시지);
    });
  });
});
