import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"
import { User } from "./entity/User"
import { Parcel } from "./entity/Parcel"
// import { User } from "./entity/User"

dotenv.config()
const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
}= process.env
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Parcel],
    migrations: [],
    subscribers: [],
})
