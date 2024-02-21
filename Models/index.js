import { ModelStatic, Sequelize, Model } from "sequelize";
import config from "../Config/config";
import model from "./model";

interface Entities {
  [key: string]: ModelStatic<Model<any, any>>;
}

const { dbConfig } = config;

const sequelize = new Sequelize(
  dbConfig.DB as string,
  dbConfig.USER as string,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false, // Disable query logging by default
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const entities: Entities = {

authentication = model(sequelize).authentication

};

const db: { sequelize: Sequelize; entities: Entities } = {
  sequelize,
  entities,
};

export default db;
