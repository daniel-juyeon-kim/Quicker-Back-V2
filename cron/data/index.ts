import { averageInstance, cacheOrderInstance, locationInstance } from "../../maria/commands";
import { blockchain, tmapApi } from "../../service";
import { Combiner } from "./combiner";
import { DataService } from "./data-service";
import { DB } from "./database";
import { ExternalApi } from "./external-api";

const database = new DB({ averageInstance, cacheOrderInstance, locationInstance });
const externalApi = new ExternalApi({ blockchain, tmapApi });
const combiner = new Combiner();

export const dataService = new DataService({ database, externalApi, combiner });
