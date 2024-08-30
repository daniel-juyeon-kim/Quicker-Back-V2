import { config } from "../config";
import { Klaytn } from "./blockchain/blockchain";
import { Crypto } from "./cryto";
import { NHNAPI } from "./message-sender/nhn-api";
import { SlackBot } from "./slack/slack-bot";
import { TmapApi } from "./tmap";

const tmapApi = new TmapApi();
const cryptoInstance = new Crypto();
const nhnApi = new NHNAPI(config.nhnApi);
const slackBot = new SlackBot(config.slackbot);
const blockChain = new Klaytn(config.klaytn.baobobProvider);

export { blockChain, cryptoInstance, nhnApi, slackBot, tmapApi };
