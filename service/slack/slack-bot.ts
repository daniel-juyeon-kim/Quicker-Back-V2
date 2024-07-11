import { WebClient } from "@slack/web-api";

import { ErrorMessage } from "./error-message";

type EnvironmentVariable = string | undefined;

export class SlackBot {
  private static readonly ERROR_EMPTY_STRING = "환경 변수중 값이 빈 문자열인 값이 있습니다.";
  private readonly client: WebClient;
  private readonly channelId: string;

  constructor(token: EnvironmentVariable, channelId: EnvironmentVariable) {
    this.validate([token, channelId]);

    this.client = new WebClient(token as string);
    this.channelId = channelId as string;
  }

  public async sendMessage(message: ErrorMessage) {
    await this.client.chat.postMessage({
      text: message.createStringMessage(),
      channel: this.channelId,
    });
  }

  private validate(environmentVariable: EnvironmentVariable): void;
  private validate(environmentVariables: EnvironmentVariable[]): void;
  private validate(environmentVariable: EnvironmentVariable | EnvironmentVariable[]) {
    if (Array.isArray(environmentVariable)) {
      return environmentVariable.forEach((value) => this.validate(value));
    }

    this.validateUndefined(environmentVariable);
    this.validateEmptyString(environmentVariable as string);
  }

  private validateUndefined(value: EnvironmentVariable) {
    if (this.isUndefined(value)) {
      throw new Error(`환경 변수중 값이 ${value}인 값이 있습니다.`);
    }
  }

  private validateEmptyString(value: string) {
    if (this.isEmptyString(value)) {
      throw new Error(SlackBot.ERROR_EMPTY_STRING);
    }
  }

  private isUndefined(value: EnvironmentVariable) {
    return value === undefined;
  }

  private isEmptyString(value: string) {
    return value === "";
  }
}
