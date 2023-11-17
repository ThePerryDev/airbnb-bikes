import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const PgDataSource = new DataSource({
  database: process.env.DATABASE,
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.BDUSERNAME,
  password: process.env.PASSWORD,
  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

export async function initializeDataSource(): Promise<void> {
  try {
    await PgDataSource.initialize();
    console.log("Data Source inicializado!");
  } catch (error) {
    console.error("Erro na inicialização do Data Source:", error.message);
    throw error;
  }
}

export default PgDataSource;