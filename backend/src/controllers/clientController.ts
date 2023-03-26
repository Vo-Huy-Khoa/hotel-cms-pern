import bcrypt from "bcrypt";
import pool from "../configs";
import { Request, Response } from "express";

class clientController {
  // Retrieve all users from the database
  async getAll(req: Request, res: Response) {
    try {
      const query = "SELECT * FROM clients";
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name, email, identity_number, phone } = req.body;

      const initValue = [name, email, identity_number, phone];

      const insertQuery =
        "INSERT INTO clients(name, email, identity_number, phone ) VALUES($1, $2, $3, $4)";
      const { rows } = await pool.query(insertQuery, initValue);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, name, email, identity_number, phone } = req.body;
      const query = {
        text: "UPDATE clients SET name = $2, email = $3, identity_number = $4, phone = $5 = $8 WHERE id = $1",
        values: [id, name, email, identity_number, phone],
      };
      const { rowCount } = await pool.query(query);
      if (rowCount === 0) {
        return res.status(404).json({ error: "clients not found" });
      }
      res.status(202).json({ message: "clients updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new clientController();
