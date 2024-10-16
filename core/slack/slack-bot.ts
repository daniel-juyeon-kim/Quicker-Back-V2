import { ChatPostMessageResponse, WebClient } from "@slack/web-api";
import { ErrorMessageBot } from ".";
import { validateEnv } from "../../util/env";
import { EnvConfig } from "../../util/env/types";
import { ErrorMessage } from "./error-message";

export class SlackBot implements ErrorMessageBot {
  private readonly client: WebClient;
  private readonly channelId: string;

  constructor(envObject: EnvConfig["slackbot"]) {
    validateEnv(envObject);

    this.client = new WebClient(envObject.token);
    this.channelId = envObject.channelId;
  }

  public async sendMessage(message: ErrorMessage<unknown>) {
    try {
      const response = await this.client.chat.postMessage({
        text: message.parseToStringForSlack(),
        channel: this.channelId,
      });

      this.validateResponse(response);
    } catch (e) {
      const error = e as ChatPostMessageResponse;
    }
  }

  private validateResponse(response: ChatPostMessageResponse) {
    if (response.ok) {
      return;
    }
    throw response;
  }
}
