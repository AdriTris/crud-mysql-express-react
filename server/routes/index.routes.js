//archivo para crear diferentes rutas

import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

router.get("/ping", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 as result");
  console.log(rows);
  res.json(rows);
}); //crear una peticion llamada ping y cuando se haga eso se hace una consulta de de sql para ver si funciona la conexion

export default router;
