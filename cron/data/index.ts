import { blockchain, tmapApi } from "../../core/instance";
import {
  averageCostRepository,
  deliveryPersonMatchedDateRepository,
  locationRepository,
} from "../../database/type-orm/instance";

import { Combiner } from "./combiner";
import { DataService } from "./data-service";
import { DB } from "./database";
import { ExternalApi } from "./external-api";

const database = new DB({
  averageCostRepository: averageCostRepository,
  deliveryPersonMatchedDateRepository: deliveryPersonMatchedDateRepository,
  locationRepository: locationRepository,
});
const externalApi = new ExternalApi({ blockchain, tmapApi });
const combiner = new Combiner();

export const dataService = new DataService({ database, externalApi, combiner });
