import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS room_users (
    id SERIAL PRIMARY KEY,
    room_id SERIAL NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(room_id) 
	  REFERENCES rooms(id),
    FOREIGN KEY(user_id) 
	  REFERENCES users(id)
  );
`;

async function RoomUserUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration room_users successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function RoomUserDown(req: Request, res: Response) {
  try {
    await pool.query("DROP TABLE room_users");
    res.status(201).json("DROP room_users successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export { RoomUserUp, RoomUserDown };
