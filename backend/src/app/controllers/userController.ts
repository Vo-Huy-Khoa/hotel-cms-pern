import bcrypt from "bcrypt";
import pool from "../../configs";
import { Request, Response } from "express";

class userController {
  async create(req: Request, res: Response) {
    try {
      const user_name = req.body.user_name;
      const full_name = req.body.full_name;
      const email = req.body.email;
      const oldPassword = req.body.password;
      const password = await bcrypt.hash(oldPassword, 10);
      const identity_number = req.body.identity_number;
      const phone = req.body.phone;
      const avatar = req.body.avatar;
      const role = req.body.role;
      const initValue = [
        user_name,
        full_name,
        email,
        password,
        identity_number,
        phone,
        avatar,
        role,
      ];

      const insertQuery =
        "INSERT INTO users(user_name, full_name, email, password, identity_number, phone, avatar, role) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";
      const { rows } = await pool.query(insertQuery, initValue);
      res.status(201).json(rows[0]);
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
      res.status(200).json(rows);
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
