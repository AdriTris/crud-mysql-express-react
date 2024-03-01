//archivo para conectarme con mysql

import { createPool } from "mysql2/promise"; //debo instanciar createpool

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "crud-ejemplo",
}); //puedo utilizarlo para hacer consultas
