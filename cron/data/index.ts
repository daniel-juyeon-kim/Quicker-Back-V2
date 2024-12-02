import { blockchain, tmapApi } from "../../core/instance";
import { averageInstance, cacheOrderInstance, locationInstance } from "../../maria/commands";

import { Combiner } from "./combiner";
import { DataService } from "./data-service";
import { DB } from "./database";
import { ExternalApi } from "./external-api";

const database = new DB({
  averageCostRepository: averageInstance,
  deliveryPersonMatchedDateRepository: cacheOrderInstance,
  locationInstance,
});
const externalApi = new ExternalApi({ blockchain, tmapApi });
const combiner = new Combiner();

export const dataService = new DataService({ database, externalApi, combiner });
