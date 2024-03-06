//archivo que tengan las funciones de CRUD
//req es todo lo que el cliente envia

import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [result] = await pool.query("SELECT * FROM auth WHERE email = ?", [
      email,
    ]);

    //si no encuentra nada
    if (result.length === 0)
      return res.status(404).json({ message: "email not found" });

    // Verificar la contraseña
    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // Generar un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "ejemplo-secreto",
      {
        expiresIn: "1m",
      }
    );

    //res.json(result[0]);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUserAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    //entrega la contraseña encryptada
    const hashedPassword = await bcrypt.hash(password, 5);

    //crea un usuario
    const [result] = await pool.query(
      "INSERT INTO auth(email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
