import bcrypt from "bcrypt";
import pool from "../../configs";
import { Request, Response } from "express";

class userController {
  async create(req: Request, res: Response) {
    try {
      const { username, password }: any = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username";
      const values = [username, hashedPassword];
      const { rows } = await pool.query(query, values);

      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  // Retrieve all users from the database
  async getAll(req: Request, res: Response) {
    try {
      const query = "SELECT * FROM users";
      const { rows } = await pool.query(query);
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const username = req.body.username;
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      res.status(202).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new userController();
