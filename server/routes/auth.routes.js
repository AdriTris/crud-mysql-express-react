//archivo de rutas relacionado , todo el CRUD
//añadir esto en index.js

import { Router } from "express";
import { login, createUserAuth } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", createUserAuth);

router.post("/login", login);

export default router;
