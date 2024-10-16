import { ErrorMessage } from "../../../core/slack/error-message";

test("슬랙 에러 메시지 테스트", () => {
  const error = {
    name: "테스트용 에러 메시지 ",
    message: "에러 메시지",
    stack: "스텍트레이스",
  };
  const occurDate = new Date(1995, 11, 17, 3, 24, 0);
  const errorMessage = new ErrorMessage({ error, date: occurDate });

  const expectMessage = `*에러 발생 [ ${occurDate.toLocaleString()} ]* \n\n${JSON.stringify(error)}`;

  expect(errorMessage.parseToStringForSlack()).toBe(expectMessage);
});
