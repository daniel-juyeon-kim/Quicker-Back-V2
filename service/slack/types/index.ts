import { ErrorMessage } from "..";

export interface ErrorMessageBot {
  sendMessage(message: ErrorMessage): Promise<void>;
}
