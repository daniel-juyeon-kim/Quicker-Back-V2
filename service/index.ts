import { config } from "../config";
import { BlockChain } from "./blockchain";
import { Crypto } from "./cryto";
import { DateFomater } from "./dateFormat";
import { NHNAPI } from "./nhn-api";
import { SlackBot } from "./slack/slack-bot";
import { TmapApi } from "./tmap";

const tmapApi = new TmapApi();
const cryptoInstance = new Crypto();
const dateFormater = new DateFomater();
const nhnApi = new NHNAPI(config.nhnApi);
const slackBot = new SlackBot(config.slackbot.SLACK_BOT_TOKEN, config.slackbot.SLACK_BOT_CHANNEL_ID);
const blockChain = new BlockChain(config.klaytn.baobobProvider);

export { blockChain, cryptoInstance, dateFormater, nhnApi, slackBot, tmapApi };
