import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../../configs";

const Register = async (req: Request, res: Response) => {
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
};

const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    return res.status(200).json("a");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

export { Register, Login };
