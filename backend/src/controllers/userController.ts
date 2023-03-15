import bcrypt from "bcrypt";
import pool from "../configs/db";
import { Request, Response } from "express";

class userController {
  createUser = async (req: Request, res: Response) => {
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
  };
  // Retrieve all users from the database
  getUsers = async (req: Request, res: Response) => {
    const query = "SELECT * FROM users";
    const { rows } = await pool.query(query);
    res.status(200).json(rows[0]);
  };
}

export default new userController();
