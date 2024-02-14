import mongoose from "mongoose";
import { findLocation, saveLocation } from "../../Mongo/Command/Location"

describe("/current-deliver-location", ()=> {
  test("/ (GET) 라우터 테스트", async () => {
    const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/', { dbName: 'realTimeLocation' });
    const address = "1"
    const {X, Y} = await findLocation(connection, address) as {X : number, Y : number}
    expect({X: X, Y: Y}).toEqual({X : 126, Y: 36.7})
  })
    
  test("/ (POST) 라우터 테스트", async () => {
    const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/', { dbName: 'realTimeLocation' })
    const address = "2"
    const loaction = { 
      X: 126,
      Y: 36.7,
    }
    expect(async ()=> await saveLocation(connection, address, loaction)).not.toThrowError()
  })
})

