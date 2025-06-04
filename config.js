import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const database = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;

const sequelize = new Sequelize(database,user, password, {
  host: host,
  port: port,
  dialect: "mysql",
});

export default sequelize;
