export enum TYPE {
  INTEGER = "정수",
  BOOLEAN = "불리언",
  FLOAT = "실수",
  STRING = "문자열",
  OBJECT = "객체",
  INTEGER_ARRAY = "정수 배열",
  ARRAY = "배열",
  POSITIVE_INTEGER = "양수",
}

export enum DATA {
  NOT_EXIST = "데이터가 존재하지 않습니다.",
  EXIST = "데이터가 존재합니다.",
}

export enum FORMAT {
  PHONE_NUMBER = "전화번호 형식",
  DATE = "날자 형식",
  EMAIL = "이메일 형식",
}

export const mustBe = (target: TYPE | FORMAT) => `${target} 이어야 합니다.`;
