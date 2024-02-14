import config from "../../config";

const { Sequelize } = require("sequelize");

export default new Sequelize("Quicker", config.db.maria.user, config.db.maria.password, {
  dialect: "mariadb",
  host: config.db.maria.host,
  port: config.db.maria.port,
  logging: false
});
