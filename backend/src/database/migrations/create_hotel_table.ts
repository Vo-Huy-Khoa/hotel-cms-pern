import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    description NVARCHAR
  );
`;

async function HotelUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration hotels successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function HotelDown(req: Request, res: Response) {
  try {
    await pool.query("DROP TABLE hotels");
    res.status(201).json("DROP hotels successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export { HotelUp, HotelDown };
