import pool from "../../configs";
import { Request, Response } from "express";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    booking_id SERIAL NOT NULL,
    method varchar NOT NULL,
    amount float,
    status boolean,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(booking_id) 
	  REFERENCES bookings(id)

  );
`;

async function PaymentUp(req: Request, res: Response) {
  try {
    await pool.query(migrationQuery);
    res.status(201).json("Migration payments successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function PaymentDown(req: Request, res: Response) {
  try {
    await pool.query("DROP TABLE payments");
    res.status(201).json("DROP payments successful");
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export { PaymentUp, PaymentDown };
