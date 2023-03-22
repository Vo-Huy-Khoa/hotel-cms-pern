import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../configs";
import { createToken, refreshToken } from "../middleware/token";

class authController {
  async register(req: Request, res: Response) {
    try {
      const user_name = req.body.user_name;
      const email = req.body.email;
      const oldPassword = req.body.password;
      const password = await bcrypt.hash(oldPassword, 10);

      const initValue = [user_name, email, password];

      const insertQuery =
        "INSERT INTO users(user_name, email, password) VALUES($1, $2, $3)";
      await pool.query(insertQuery, initValue);
      res.status(201).json("Register done!");
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    const { user_name, password } = req.body;
    try {
      const { rows } = await pool.query(
        "SELECT *  FROM users WHERE user_name = $1",
        [user_name]
      );
      const user = rows[0];

      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.json({ message: "Invalid user_name or password" });
      }

      const token = createToken(user) || "";
      const RefreshToken = refreshToken(user, token);

      await pool.query("UPDATE users SET refresh_token = $2 WHERE id = $1 ", [
        user.id,
        RefreshToken,
      ]);

      res.status(200).json({
        user: user,
        token,
        refresh_token: RefreshToken,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async refreshToken(req: Request, res: Response) {
    const { refresh_token, id } = req.body;

    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);

      if (!rows || rows.length === 0) {
        res.status(404).json({ error: "User not found" });
      }
      const user = rows[0];

      if (user.refresh_token !== refresh_token) {
        return res.status(400).json({ message: "Invalid refresh token" });
      }

      const RefreshToken = refreshToken(rows[0], refresh_token);
      await pool.query("UPDATE users SET refresh_token = $2 WHERE id = $1 ", [
        rows[0].id,
        RefreshToken,
      ]);
      return res.status(201).json({ refresh_token: RefreshToken });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  async logout(req: Request, res: Response) {
    const id = req.body.id;
  }
}
export default new authController();
