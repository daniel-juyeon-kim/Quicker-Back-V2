import { WebClient } from "@slack/web-api";
import { config } from "../config";
import { Blockchain, Klaytn } from "./blockchain";
import { ErrorMessageBot, NaverSmsApi, SlackBot, SmsApi, TmapApi } from "./external-api";
import { KeyCreator } from "./key-creator";

const webClient = new WebClient(config.slackbot.token);
export const errorMessageBot: ErrorMessageBot = new SlackBot({
  webClient,
  channelId: config.slackbot.channelId,
});
export const keyCreator = new KeyCreator(config.cryptoKey as string);

export const tmapApi = new TmapApi(config.tmapApiKey);
export const messageSender: SmsApi = new NaverSmsApi(config.nhnApi);
export const blockchain: Blockchain = new Klaytn(config.klaytn.baobobProvider);
