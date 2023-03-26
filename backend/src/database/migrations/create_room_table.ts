import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    room_type_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(100),
    status boolean,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(room_type_id) 
	  REFERENCES room_types(id)
  );
`;

async function RoomUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration rooms successful");
  } catch (error) {
    res.status(500).json({ error: "Migration rooms error" });
  }
}

async function RoomDown(req: Request, res: Response) {
  try {
    await pool.query("DROP TABLE rooms");
    res.status(201).json("DROP rooms successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export { RoomUp, RoomDown };
