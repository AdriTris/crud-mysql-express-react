//archivo de rutas relacionado con los clientes, todo el CRUD
//añadir esto en index.js

import { Router } from "express";

import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clients.controllers.js";

const router = Router();

//permite solicitar todos los clientes
router.get("/clients", getClients);

//obtener un unico cliente a partir de un id
router.get("/clients/:id", getClient);

//permite crear clientes
router.post("/clients", createClient);

//permite modificar un cliente
router.put("/clients/:id", updateClient);

//permite eliminar un cliente
router.delete("/clients/:id", deleteClient);

export default router;
