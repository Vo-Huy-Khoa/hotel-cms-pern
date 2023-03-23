import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    email VARCHAR(100),
    identity_number VARCHAR(15),
    phone VARCHAR(12),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;

async function ClientUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration users successful");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Migration users error" });
  }
}

async function ClientDown(req: Request, res: Response) {
  try {
    await pool.query("DROP TABLE users");
    res.status(201).json("DROP users successful");
  } catch (error) {
    res.status(500).json({ error: "DROP table users error" });
  }
}

export { ClientUp, ClientDown };
