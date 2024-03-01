//archivo de rutas relacionado con los usuarios, todo el CRUD
//añadir esto en index.js

import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";

const router = Router();

//permite solicitar todos los usuarios
router.get("/users", getUsers);

//obtener un unico usuario a partir de un id
router.get("/users/:id", getUser);

//permite crear usuarios
router.post("/users", createUser);

//permite modificar un usuario
router.put("/users/:id", updateUser);

//permite eliminar un usuario
router.delete("/users/:id", deleteUser);

export default router;
