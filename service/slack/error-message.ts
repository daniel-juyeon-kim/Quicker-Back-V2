export class ErrorMessage {
  constructor(
    private readonly error: Error,
    private readonly occurDate: Date,
  ) {}

  public parseToStringForSlack() {
    return (
      `*에러 발생 [ ${this.occurDate.toLocaleString("ko-KR")} ]* \n\n` +
      `*Error Message : * ${this.error.message}\n` +
      `*Error Stack : * \`\`\`${this.error.stack}\`\`\``
    );
  }
}
