import { WebClient } from "@slack/web-api";

import { validateEnv } from "../../util/env";
import { EnvConfig } from "../../util/env/types";
import { ErrorMessage } from "./error-message";

interface ErrorMessageBot {
  sendMessage(message: ErrorMessage): Promise<void>;
}

export class SlackBot implements ErrorMessageBot {
  private readonly client: WebClient;
  private readonly channelId: string;

  constructor(envObject: EnvConfig["slackbot"]) {
    validateEnv(envObject);

    this.client = new WebClient(envObject.token);
    this.channelId = envObject.channelId;
  }

  public async sendMessage(message: ErrorMessage) {
    await this.client.chat.postMessage({
      text: message.createStringMessage(),
      channel: this.channelId,
    });
  }
}
