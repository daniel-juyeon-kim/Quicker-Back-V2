import { initializeDataSource } from "../../../database/type-orm";
import { testAppDataSource } from "./data-source";

export default async function () {
  try {
    await initializeDataSource(testAppDataSource);
  } catch (error) {
    console.error("테스트 DB 커넥션 초기화 실패");
    throw error;
  }
}
