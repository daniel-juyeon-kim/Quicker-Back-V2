import dotenv from "dotenv";
dotenv.config({path : "../../.env"})

import config from "../../config";
import { averageInstance, cacheOrderInstance, locationInstance } from "../../maria/commands";
import sequelizeConnector from "../../maria/connector/sequelize-connector";
import { AverageOfCostAttributes, initModels } from "../../maria/models/init-models";
import { blockChain, tmapApi } from "../../service";
// 설정
initModels(sequelizeConnector);

type Km = ({
  orderId: number;
  km: number;
} | undefined)

type BlockChain = ({
  orderNumber: number;
  price: number;
} | undefined)

type Distance = "5KM" | "10KM" | "15KM" | "20KM" | "25KM" | "30KM" | "40KM" | "50KM" | "60KM" | "60+KM"

interface Combine {
  price: number | undefined;
  orderId?: number | undefined;
  km?: number | undefined;
}

class MonthGenerator {
  getFirstDay (month : number) {
    const date = new Date();
    date.setMonth(month);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date
  }
}

class Converter {
  private distanceUnits = [5, 10, 15, 20, 25, 30, 40, 50, 60]
  removeCurlBrackets (order : {id : number , [key : string] : any}[]) {
    const idList: number[] = [];
    order.map((order) => {
      idList[idList.length]=order.id
    });
    return idList;
  }
  
  combineById (kms : Km [] , blockChains : BlockChain []) {
    const result = [];
    for (const distance of kms) {
      for (const blockChain of blockChains) {
        if (distance?.orderId === blockChain?.orderNumber) {
          result[result.length] = {
            ...distance,
            price: blockChain?.price,
          };
          break;
        }
      }
    }
    return result;
  }

  convertCountList (template : Template ,combine : Combine []) {
    const countList = template.getAverageOfCostAttributesTemplate()

    combine.map((element) => {
      for (const unit of this.distanceUnits) {
        if (element.km && element.price && element.orderId) {
          if (element.km > 60) {
            countList["60+KM"] += 1
            break;
          }
          else if (element.km < unit) {
            const key = unit + "KM" as Distance
            countList[key] += 1
            break;
          }
        }
      }
    })
    return countList
  }

  convertSumList (template : Template, combine : Combine []) {
    const sumList = template.getAverageOfCostAttributesTemplate()

    combine.map((element) => {
      for (const unit of this.distanceUnits) {
        if (element.km && element.price && element.orderId) {
          if (element.km > 60) {
            sumList["60+KM"] += element.price
            break;
          }
          else if (element.km < unit) {
            const key = unit + "KM" as Distance
            sumList[key] += element.price
            break;
          }
        }
      }
    })
    return sumList
  }
}

class StateChecker {
  returnFulfilled(promiseDistances : PromiseSettledResult<{
    orderId: number;
    km: number;
  }>[]) {
    return promiseDistances.map((promiseDistance) => {
      if (promiseDistance.status === 'fulfilled') return promiseDistance.value
    })
  }
}

class AverageCostCalculator {
  calculateAverage (template : Template, {countList, sumList} : {[key : string] : AverageOfCostAttributes}) {
    const averageTemp = template.getAverageOfCostAttributesTemplate()
    for (const key in countList) {
      if (key !== "date") {
        const unit = key as Distance  
        if (sumList[unit] !== 0) {
          averageTemp[unit] = Math.round(sumList[unit] / countList[unit]);
        }
      }
    }
    return averageTemp
  }
}

class Template {
  getAverageOfCostAttributesTemplate () {
    return {
      date: new Date().toISOString(),
      "5KM": 0,
      "10KM": 0,
      "15KM": 0,
      "20KM": 0,
      "25KM": 0,
      "30KM": 0,
      "40KM": 0,
      "50KM": 0,
      "60KM": 0,
      "60+KM": 0,
    };
  }
}

export const main = async () => {
  const converter = new Converter()
  const stateChecker = new StateChecker()
  const calculator = new AverageCostCalculator()
  const monthGenerator = new MonthGenerator()
  const template = new Template()
  
  const startDate = monthGenerator.getFirstDay(new Date().getMonth() - 1)
  const endDate = monthGenerator.getFirstDay(new Date().getMonth())

  const orderIds = await cacheOrderInstance.findAllId(startDate, endDate)
  const filteredOrderIds = converter.removeCurlBrackets(orderIds)

  const locations = await locationInstance.findAll(filteredOrderIds) 
  const prices = await blockChain.getOrderPrices(filteredOrderIds)
  
  if (filteredOrderIds.length !== 0 || prices.length !== 0) {
    const distances = await tmapApi.requestRouteDistances(locations , config.tmap.apiKey as string)
    const fulfilledDistances = stateChecker.returnFulfilled(distances)
    const combinedData = converter.combineById(fulfilledDistances, prices)

    const countList = converter.convertCountList(template,combinedData)
    const sumList = converter.convertSumList(template, combinedData)
    const average = calculator.calculateAverage(template, {countList,sumList})  
    await averageInstance.create(average);
  }
};