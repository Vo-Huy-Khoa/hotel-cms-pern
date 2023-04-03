import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../configs";
import { createToken, refreshToken } from "../middleware/token";
import jwt from "jsonwebtoken";

class authController {
  async register(req: Request, res: Response) {
    try {
      const { full_name, user_name, email } = req.body;
      const oldPassword = req.body.password;
      const password = await bcrypt.hash(oldPassword, 10);
      const initValue = [full_name, user_name, email, password];
      const insertQuery =
        "INSERT INTO users(full_name, user_name, email, password) VALUES($1, $2, $3, $4) RETURNING *";
      const { rows } = await pool.query(insertQuery, initValue);
      res.status(201).json(rows[0]);
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
        return;
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
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
    const JWT_SECRET = process.env.JWT_SECRET || "";

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

      jwt.verify(
        refresh_token,
        REFRESH_TOKEN_SECRET,
        async (err: any, data: any) => {
          if (err) res.sendStatus(403);
          const accessToken = jwt.sign(
            { id: data.id, user_name: data.user_name, email: data.email },
            JWT_SECRET,
            { expiresIn: "604800000s" }
          );
          await pool.query(
            "UPDATE users SET refresh_token = $2 WHERE id = $1 ",
            [user.id, accessToken]
          );
          return res.status(201).json({ refresh_token: accessToken });
        }
      );
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  async logout(req: Request, res: Response) {
    const id = req.body.id;
    try {
      const { rows } = await pool.query("SELECT *  FROM users WHERE id = $1", [
        id,
      ]);
      const user = rows[0];

      if (!user) {
        res.json({ message: "Invalid user_name or password" });
      }

      const RefreshToken = "";
      await pool.query("UPDATE users SET refresh_token = $2 WHERE id = $1 ", [
        user.id,
        RefreshToken,
      ]);
      return res.status(201).json({ message: "Logout successfully!" });
    } catch (err) {
      return res.status(201).json({ message: "Logout error!" });
    }
  }
}
export default new authController();
