import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS room_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    count decimal,
    price decimal,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;

async function RoomTypeUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration room_types successful");
  } catch (error) {
    res.status(500).json({ error: "Migration room_types error" });
  }
}

async function RoomTypeDown(req: Request, res: Response) {
  try {
    await pool.query("DROP TABLE room_types");
    res.status(201).json("DROP room_types successful");
  } catch (error) {
    res.status(500).json({ error: "DROP room_types error" });
  }
}
export { RoomTypeUp, RoomTypeDown };
