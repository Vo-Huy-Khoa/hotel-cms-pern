import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../configs";
import { createToken, refreshToken } from "../middleware/token";

class authController {
  async register(req: Request, res: Response) {
    try {
      const user_name = req.body.user_name;
      const full_name = req.body.full_name;
      const email = req.body.email;
      const oldPassword = req.body.password;
      const password = await bcrypt.hash(oldPassword, 10);

      const initValue = [user_name, full_name, email, password];

      const insertQuery =
        "INSERT INTO users(user_name, full_name, email, password) VALUES($1, $2, $3, $4)";
      const { rows } = await pool.query(insertQuery, initValue);
      res.status(201).json("Register done: " + rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE user_name = $1 AND password = $2",
        [username, bcrypt.compareSync(password, password)]
      );
      if (rows[0].rowCount === 1) {
        const token = createToken(rows[0]) || "";
        const RefreshToken = refreshToken(rows[0], token);

        return res.status(200).json({
          user: rows[0],
          token,
          RefreshToken,
        });
      } else {
        res.json({ success: false, message: "Invalid username or password" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async refreshToken(req: Request, res: Response) {
    const { refreshToken, id: id } = req.body;
    if (!refreshToken || !id) {
      return res.sendStatus(401);
    }
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (rows[0].rowCount === 1) {
        const RefreshToken = refreshToken(rows[0], refreshToken);
        return res.status(201).json({ RefreshToken });
      } else {
        res.status(500).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
}
export default new authController();
