import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    hotel_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    capacity NUMBER NOT NULL,
    description NVARCHAR(12) NOT NULL,
    image VARCHAR(100) NOT NULL,
    status boolean,
    FOREIGN KEY(hotel_id) 
	  REFERENCES hotels(id)
  );
`;

async function RoomUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration rooms successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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
