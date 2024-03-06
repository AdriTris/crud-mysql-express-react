//archivo que tengan las funciones de CRUD
//req es todo lo que el cliente envia

import { pool } from "../db.js";

//funcion que retornara una respuesta al cliente
export const getClients = async (req, res) => {
  try {
    //en el caso que exista un error no se caiga el servidor
    const [result] = await pool.query("SELECT * FROM clients"); //retorna todos los clientes
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClient = async (req, res) => {
  try {
    //req.params.id sirve para recibir el valor de id de cada cliente
    const [result] = await pool.query("SELECT * FROM clients WHERE id = ?", [
      req.params.id,
    ]);

    //si no encuentra nada
    if (result.length === 0)
      return res.status(404).json({ message: "Client not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createClient = async (req, res) => {
  try {
    const { name, last_name, phone, address } = req.body;
    //crea un usuario
    const [result] = await pool.query(
      "INSERT INTO clients(name, last_name, phone, address) VALUES (?, ?, ?, ?)",
      [name, last_name, phone, address]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      name,
      last_name,
      phone,
      address,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const result = await pool.query("UPDATE clients SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM clients WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    return res.sendStatus(204); //devuelve el status No content pero no devuelve ninguna informacion
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
