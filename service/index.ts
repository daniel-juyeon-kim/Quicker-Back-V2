import { config } from "../config";
import { Klaytn } from "./blockchain/blockchain";
import { Crypto } from "./cryto";
import { NaverSmsApi } from "./message-sender/naver-sms-api";
import { SlackBot } from "./slack/slack-bot";
import { TmapApi } from "./tmap-api";

export const cryptoInstance = new Crypto();
export const slackBot = new SlackBot(config.slackbot);
export const nhnApi = new NaverSmsApi(config.nhnApi, slackBot);
export const tmapApi = new TmapApi(config.tmapApiKey, slackBot);
export const blockChain = new Klaytn(config.klaytn.baobobProvider);
