import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    full_name VARCHAR(60),
    email VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    identity_number VARCHAR(15),
    phone VARCHAR(12),
    role SERIAL,
    refresh_token VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;

async function UserUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration users successful");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Migration users error" });
  }
}

async function UserDown(req: Request, res: Response) {
  try {
    await pool.query("DROP TABLE users");
    res.status(201).json("DROP users successful");
  } catch (error) {
    res.status(500).json({ error: "DROP table users error" });
  }
}

export { UserUp, UserDown };
