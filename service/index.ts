import { config } from "../config";
import { Klaytn } from "./blockchain";
import { Crypto } from "./cryto";
import { NaverSmsApi } from "./message-sender";
import { SlackBot } from "./slack";
import { TmapApi } from "./tmap-api";

export const cryptoInstance = new Crypto();
export const slackBot = new SlackBot(config.slackbot);
export const nhnApi = new NaverSmsApi(config.nhnApi, slackBot);
export const tmapApi = new TmapApi(config.tmapApiKey, slackBot);
export const blockChain = new Klaytn(config.klaytn.baobobProvider);
