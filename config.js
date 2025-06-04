import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const database = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;

const sequelize = new Sequelize(database,user, password, {
  host: host,
  dialect: "mysql",
});

export default sequelize;
