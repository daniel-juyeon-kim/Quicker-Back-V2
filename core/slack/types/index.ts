import { ErrorMessage } from "..";

export interface ErrorMessageBot {
  sendMessage(message: ErrorMessage<unknown>): Promise<void>;
}
