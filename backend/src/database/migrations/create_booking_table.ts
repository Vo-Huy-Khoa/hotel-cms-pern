import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    room_id SERIAL NOT NULL,
    user_id SERIAL NOT NULL,
    check_in date NOT NULL,
    check_out date,
    total_price float,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(room_id) 
	  REFERENCES rooms(id),
    FOREIGN KEY(user_id) 
	  REFERENCES users(id)
  );
`;

async function BookingUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration bookings successful");
  } catch (error) {
    res.status(500).json({ error: "Migration bookings error" });
  }
}

async function BookingDown(req: Request, res: Response) {
  try {
    await pool.query("DROP TABLE bookings");
    res.status(201).json("DROP bookings successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export { BookingUp, BookingDown };
