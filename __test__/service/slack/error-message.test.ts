import { ErrorMessage } from "../../../service/slack/error-message";

test("슬랙 에러 메시지 테스트", () => {
  const error = {
    name: "테스트용 에러 메시지 ",
    message: "에러 메시지",
    stack: "스텍트레이스",
  };
  const occurDate = new Date(1995, 11, 17, 3, 24, 0);
  const errorMessage = new ErrorMessage(error, occurDate);

  expect(errorMessage.toString()).toBe(
    `*에러 발생 [ 1995. 12. 17. 오전 3:24:00 ]* \n\n` +
      `*Error Message : * 에러 메시지\n` +
      `*Error Stack : * \`\`\`스텍트레이스\`\`\``,
  );
});
