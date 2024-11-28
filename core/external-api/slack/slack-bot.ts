import { ChatPostMessageResponse, WebClient } from "@slack/web-api";
import { isUndefined } from "../../../util";
import { validateEnvValue } from "../../../util/env";
import { EnvConfig } from "../../../util/env/types";
import { ErrorMessage } from "./error-message";
import { ErrorMessageBot } from "./error-message-bot";
import { ErrorMessageBotError } from "./error-message-bot.error";

export class SlackBot implements ErrorMessageBot {
  private readonly client: WebClient;
  private readonly channelId: string;

  constructor({ webClient, channelId }: { webClient: WebClient; channelId: EnvConfig["slackbot"]["channelId"] }) {
    validateEnvValue("channelId", channelId);
    if (isUndefined(webClient.token)) {
      throw new Error("slack token이 존재하지 않습니다.");
    }

    this.client = webClient;
    this.channelId = channelId;
  }

  public async sendMessage(message: ErrorMessage<unknown>) {
    try {
      const response = await this.client.chat.postMessage({
        text: message.parseToStringForSlack(),
        channel: this.channelId,
      });

      this.validateResponse(response);
    } catch (e) {
      throw new ErrorMessageBotError(e);
    }
  }

  private validateResponse(response: ChatPostMessageResponse) {
    if (response.ok) {
      return;
    }
    throw response;
  }
}
