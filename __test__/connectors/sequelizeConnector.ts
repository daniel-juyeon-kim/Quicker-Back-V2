import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Quicker", "root", "11111111", {
  dialect: "mariadb",
  host: "localhost",
  port: 3306,
  logging: false,
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
