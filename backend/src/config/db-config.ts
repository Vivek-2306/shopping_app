import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    dialect: "postgres" as const,
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || "5", 10),
      min: parseInt(process.env.DB_POOL_MIN || "0", 10),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE || "30000", 10),
      idle: parseInt(process.env.DB_POOL_IDLE || "10000", 10),
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  }
);

export default sequelize;

