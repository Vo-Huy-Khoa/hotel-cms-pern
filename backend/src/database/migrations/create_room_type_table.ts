import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS room_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    limit SERIAL,
    price VARCHAR(255) NOT NULL,
  );
`;

async function RoomTypeUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration room_types successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function RoomTypeDown(req: Request, res: Response) {
  try {
    await pool.query("DROP TABLE room_types");
    res.status(201).json("DROP room_types successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export { RoomTypeUp, RoomTypeDown };
