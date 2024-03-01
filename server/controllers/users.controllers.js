//archivo que tengan las funciones de CRUD
//req es todo lo que el cliente envia

import { pool } from "../db.js";

//funcion que retornara una respuesta al cliente
export const getUsers = async (req, res) => {
  try {
    //en el caso que exista un error no se caiga el servidor
    const [result] = await pool.query("SELECT * FROM users"); //retorna todos los usuarios
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//funcion que retornara una respuesta al cliente
export const getUser = async (req, res) => {
  try {
    //req.params.id sirve para recibir el valor de id de cada usuario
    const [result] = await pool.query("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);

    //si no encuentra nada
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//funcion que retornara una respuesta al cliente
export const createUser = async (req, res) => {
  try {
    const { name, position, age } = req.body;
    //crea un usuario
    const [result] = await pool.query(
      "INSERT INTO users(name, position, age) VALUES (?, ?, ?)",
      [name, position, age]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name,
      position,
      age,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//funcion que retornara una respuesta al cliente
export const updateUser = async (req, res) => {
  try {
    const result = await pool.query("UPDATE users SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//funcion que retornara una respuesta al cliente
export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    return res.sendStatus(204); //devuelve el status pero no devuelve ninguna informacion
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
