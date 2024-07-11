import config from "../config";

import { BlockChain } from "./blockchain";
import { Crypto } from "./cryto";
import { DateFomater } from "./dateFormat";
import { KeyChecker } from "./key-validator";
import { NHNAPI } from "./nhn-api";
import { SlackBot } from "./slack/slack-bot";
import { TmapApi } from "./tmap";

const keyChecker = new KeyChecker();
const nhn = keyChecker.checkObject(config.nhn);
const klaytn = keyChecker.checkObject(config.klaytn);

const tmapApi = new TmapApi();
const cryptoInstance = new Crypto();
const dateFormater = new DateFomater();
const nhnApi = new NHNAPI(nhn);
const slackBot = new SlackBot(process.env.SLACK_BOT_TOKEN, process.env.SLACK_BOT_CHANNEL_ID);
const blockChain = new BlockChain(klaytn.BAOBAB_PROVIDER);

export { tmapApi, nhnApi, slackBot, cryptoInstance, dateFormater, blockChain };
