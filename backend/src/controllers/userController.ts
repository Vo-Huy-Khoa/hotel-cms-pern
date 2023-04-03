import bcrypt from "bcrypt";
import pool from "../configs";
import { Request, Response } from "express";

class userController {
  // Retrieve all users from the database
  async getAll(req: Request, res: Response) {
    try {
      const query = "select * from users ORDER BY id DESC";
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async count(req: Request, res: Response) {
    try {
      const query = "SELECT COUNT(*) FROM users;";
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { user_name, full_name, email } = req.body;
      const oldPassword = req.body.password;
      const password = await bcrypt.hash(oldPassword, 10);
      const status = req.body.status;
      const initValue = [user_name, full_name, email, status, password];

      const insertQuery =
        "INSERT INTO users(user_name, full_name, email, status, password) VALUES($1, $2, $3, $4, $5) RETURNING *";
      const { rows } = await pool.query(insertQuery, initValue);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
      res.status(202).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id, user_name, full_name, email, status } = req.body;
      const query = {
        text: "UPDATE users SET user_name = $2, full_name = $3, email = $4, status = $5 WHERE id = $1",
        values: [id, user_name, full_name, email, status],
      };
      const { rowCount } = await pool.query(query);
      if (rowCount === 0) {
        return res.status(404).json({ error: "users not found" });
      }
      res.status(202).json({ message: "users updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new userController();
