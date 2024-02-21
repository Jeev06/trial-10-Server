import { Dialect } from "sequelize";

interface Pool {
  max: number;
  min: number;
  acquire: number;
  idle: number;
}

interface DBConfig {
  HOST: string | undefined;
  USER: string | undefined;
  PASSWORD: string | undefined;
  DB: string | undefined;
  dialect: Dialect;
  pool: Pool;
}

const dbConfig: DBConfig = {
  HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "1234",
    DB: "jeev",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
};

const JWT_SECRET = "secretKey";

export default { dbConfig, JWT_SECRET };
