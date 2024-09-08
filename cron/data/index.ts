import { averageInstance, cacheOrderInstance, locationInstance } from "../../maria/commands";
import { blockChain, tmapApi } from "../../service";
import { Combiner } from "./combiner";
import { DataService } from "./data-service";
import { DB } from "./database";
import { ExternalApi } from "./external-api";

const db = new DB(averageInstance, cacheOrderInstance, locationInstance);
const externalApi = new ExternalApi(blockChain, tmapApi);
const combiner = new Combiner();

export const dataService = new DataService(db, externalApi, combiner);
