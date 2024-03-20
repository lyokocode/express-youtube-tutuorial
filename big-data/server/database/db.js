import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()


export const sequelize = new Sequelize('youtube', 'postgres', 'aelita', {
    host: process.env.DB_HOST,
    dialect: "postgres"
})