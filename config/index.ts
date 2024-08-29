import dotenv from "dotenv";
import { isDevelopment, isValidEnv, validateEnv } from "../util/env";
import { DevelopEnvChecker, ProductionEnvChecker } from "../util/env-checker";
import { EnvConfig } from "../util/env/types";

const result = dotenv.config({
  path: [".env", ".env.local"],
  override: true,
});

if (result.error) {
  throw result.error;
}

export const config = {
  nodeEnv: process.env.NODE_ENV,
  mariaDB: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
  },
  mongoDB: process.env.MONGO_DB,
  cryptoKey: process.env.CRYPTO_KEY,
  port: process.env.SERVER_PORT,
  tinyurlToken: process.env.TINYURL_TOKEN,
  urlCryptoKey: process.env.URL_CRYPTO_KEY,
  clientServerDomain: process.env.CLIENT_SERVER_DOMAIN,
  klaytn: {
    baobobProvider: process.env.KLAYTN_BAOBAB_PROVIDER,
    accessKeyId: process.env.KLAYTN_ACCESSKEY_ID,
    secretKey: process.env.KLAYTN_SECRET_KEY,
    deligationPublicKey: process.env.KLAYTN_DELIGATION_PUBLIC_KEY,
    deligationPrivateKey: process.env.KLAYTN_DELIGATION_PRIVATE_KEY,
  },
  tampApiKey: process.env.TMAP_API_KEY,
  nhnApi: {
    accesskey: process.env.NHN_API_ACCESSKEY,
    secretkey: process.env.NHN_API_SECRETKEY,
    serviceId: process.env.NHN_API_SERVICEID,
    fromNumber: process.env.NHN_API_FROMNUMBER,
  },
  slackbot: {
    token: process.env.SLACK_BOT_TOKEN,
    channelId: process.env.SLACK_BOT_CHANNEL_ID,
  },
} as const;

const checkAllEnv = (config: EnvConfig) => {
  const productionEnvChecker = new ProductionEnvChecker();
  const developEnvChecker = new DevelopEnvChecker();
  const nodeEnv = config.nodeEnv;

  if (isValidEnv(nodeEnv)) {
    validateEnv({ nodeEnv });

    if (isDevelopment(nodeEnv)) {
      developEnvChecker.checkEnv("envObject", config);
      return;
    }
  }

  productionEnvChecker.checkEnv("envObject", config);
};

checkAllEnv(config);
