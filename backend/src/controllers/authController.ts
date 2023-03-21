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
        "SELECT * FROM users WHERE user_name = $1",
        [user_name]
      );
      if (!rows[0] || !bcrypt.compareSync(password, rows[0].password)) {
        return res.status(400).json("Login Fail!");
      } else if (rows[0]) {
        const token = createToken(rows[0]) || "";
        const RefreshToken = refreshToken(rows[0], token);
        await pool.query("UPDATE users SET refresh_token = $2 WHERE id = $1 ", [
          rows[0].id,
          RefreshToken,
        ]);
        return res.status(200).json({
          user: rows[0],
          token,
          RefreshToken,
        });
      } else {
        res.json({ message: "Invalid username or password" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async refreshToken(req: Request, res: Response) {
    const { token, id } = req.body;
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (!rows || rows.length === 0) {
        res.status(404).json({ error: "User not found" });
      }

      if (rows[0].rowCount === 1) {
        const RefreshToken = refreshToken(rows[0], token);
        return res.status(201).json({ RefreshToken: RefreshToken });
      } else {
        res.status(500).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
  async logout(req: Request, res: Response) {
    const id = req.body.id;
  }
}
export default new authController();
