import bcrypt from "bcrypt";
import pool from "../configs";
import { Request, Response } from "express";

class bookingController {
  // Retrieve all users from the database
  async getAll(req: Request, res: Response) {
    try {
      const query = "SELECT * FROM bookings ORDER BY id DESC";
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { room_id, user_id, check_in, check_out, total_price } = req.body;

      const initValue = [room_id, user_id, check_in, check_out, total_price];

      const insertQuery =
        "INSERT INTO users(room_id, user_id, check_in, check_out, total_price) VALUES($1, $2, $3, $4, $5)";
      const { rows } = await pool.query(insertQuery, initValue);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, room_id, user_id, check_in, check_out, total_price } =
        req.body;
      const query = {
        text: "UPDATE bookings SET room_id = $2, user_id = $3, check_in = $4, check_out = $5, total_price = $6 WHERE id = $1",
        values: [id, room_id, user_id, check_in, check_out, total_price],
      };
      const { rowCount } = await pool.query(query);
      if (rowCount === 0) {
        return res.status(404).json({ error: "bookings not found" });
      }
      res.status(202).json({ message: "bookings updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new bookingController();
