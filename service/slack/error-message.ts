export class ErrorMessage {
  private readonly occurDate;
  private readonly error;

  constructor(error: Error, occurDate: Date) {
    this.error = error;
    this.occurDate = occurDate.toLocaleString("ko-KR");
  }

  public createStringMessage() {
    return (
      `*에러 발생 [ ${this.occurDate} ]* \n\n` +
      `*Error Message : * ${this.error.message}\n` +
      `*Error Stack : * \`\`\`${this.error.stack}\`\`\``
    );
  }
}
