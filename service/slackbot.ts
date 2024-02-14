export class SlackBot {
  private client: any;
  private channelId: string | undefined;
  private token : string | undefined;
  
  constructor(token: string | undefined, channelId: string | undefined) {
    this.token = token;
    this.channelId = channelId;
  }

  private messageTemplate(e: any) {
    return (
      `*에러 발생 [ ${new Date().toLocaleString("ko-KR")} ]* \n\n` +
      "*Error Message : * " +
      e.message +
      "\n\n" +
      "*Error stacktrace : *" +
      "  ```" +
      e.stack +
      "``` "
    );
  }

  public async sendMessage(e: any) {
    try {
      await this.client.chat.postMessage({
        channel: this.channelId,
        text: this.messageTemplate(e),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

