import { config } from "../config";
import { Blockchain, Klaytn } from "./blockchain";
import { KeyCreator } from "./key-creator";
import { MessageSender, NaverSmsApi } from "./message-sender";
import { ErrorMessageBot, SlackBot } from "./slack";
import { TmapApi } from "./tmap-api";

export const keyCreator = new KeyCreator(config.cryptoKey as string);
export const errorMessageBot: ErrorMessageBot = new SlackBot(config.slackbot);
export const tmapApi = new TmapApi(config.tmapApiKey, errorMessageBot);
export const messageSender: MessageSender = new NaverSmsApi(config.nhnApi, errorMessageBot);
export const blockchain: Blockchain = new Klaytn(config.klaytn.baobobProvider);
