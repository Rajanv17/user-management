import { DataSource } from "typeorm";
import { UserEntity } from "../entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "rajan123",
  database: process.env.DB_NAME || "user_management",
  entities: [UserEntity],
  synchronize: true,
});
