import { mkdir } from "node:fs/promises";
export class Folder {
  async createLogFolder () {
    try {
      await mkdir("./logs");
    } catch (error: any) {
      if (this.isAlreadyExistFolder(error)) {
        console.error(error);
        throw error;
      }
    }
  };

  private isAlreadyExistFolder (error : any) {
    return error?.errno !== -17
  }
}