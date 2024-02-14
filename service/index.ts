import config from "../config";

import { NHNAPI } from "./nhn-api";
import { TmapApi } from "./tmap";
import { SlackBot } from "./slackbot";
import { KeyChecker } from "./key-validator";
import { Crypto } from "./cryto";
import { DateFomater } from "./dateFormat";
import { BlockChain } from "./blockchain";

const keyChecker = new KeyChecker();
const nhn = keyChecker.checkObject(config.nhn);
const slack = keyChecker.checkObject(config.slackBot)
const klaytn = keyChecker.checkObject(config.klaytn);

const tmapApi = new TmapApi();
const cryptoInstance = new Crypto();
const dateFormater = new DateFomater();
const nhnApi = new NHNAPI(nhn);
const slackBot = new SlackBot(slack.token, slack.channelId);
const blockChain = new BlockChain(klaytn.BAOBAB_PROVIDER)

export { tmapApi, nhnApi, slackBot, cryptoInstance, dateFormater, blockChain };
