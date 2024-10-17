export enum TYPE {
  INTEGER = "정수",
  FLOAT = "실수",
  STRING = "문자열",
  OBJECT = "객체",
  INTEGER_ARRAY = "정수 배열",
}

export enum DATA {
  NOT_EXIST = "데이터가 존재하지 않습니다.",
  EXIST = "데이터가 존재합니다.",
}

export enum FORMAT {
  PHONE_NUMBER = "전화번호 형식",
}

export const mustBe = (type: TYPE | FORMAT) => `${type} 여야 합니다.`;
