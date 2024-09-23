import { testAppDataSource } from "./data-source";

export default async function () {
  try {
    await testAppDataSource.initialize();
  } catch (error) {
    console.error("테스트 DB 커넥션 초기화 실패");
    throw error;
  }
}
