import pool from "../configs";
import { Request, Response } from "express";

class bookingController {
  // Retrieve all users from the database
  async getAll(req: Request, res: Response) {
    try {
      const query =
        "select bookings.id, bookings.client_id,bookings.room_id, rooms.name as room, clients.name as client, bookings.check_in, bookings.check_out,bookings.total_price, bookings.created_at, bookings.updated_at from bookings JOIN rooms on bookings.room_id=rooms.id JOIN clients on bookings.client_id= clients.id ORDER BY id DESC";
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async totalMoney(req: Request, res: Response) {
    try {
      const query = "SELECT SUM(total_price) FROM bookings;";
      const { rows } = await pool.query(query);
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async countCheckIn(req: Request, res: Response) {
    try {
      const query =
        "SELECT COUNT(*) as count FROM bookings WHERE check_in = CURRENT_DATE";
      const { rows } = await pool.query(query);
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async countCheckOut(req: Request, res: Response) {
    try {
      const query =
        "SELECT COUNT(*) as count FROM bookings WHERE check_out = CURRENT_DATE";
      const { rows } = await pool.query(query);
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { room_id, client_id, check_in, check_out, total_price } = req.body;

      const initValue = [room_id, client_id, check_in, check_out, total_price];

      const insertQuery =
        "INSERT INTO bookings(room_id, client_id, check_in, check_out, total_price) VALUES($1, $2, $3, $4, $5) RETURNING *";
      const { rows } = await pool.query(insertQuery, initValue);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rows } = await pool.query(
        `SELECT * FROM bookings WHERE id = ${id}`
      );
      res.status(202).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, room_id, client_id, check_in, check_out, total_price } =
        req.body;
      const query = {
        text: "UPDATE bookings SET room_id = $2, client_id = $3, check_in = $4, check_out = $5, total_price = $6 WHERE id = $1",
        values: [id, room_id, client_id, check_in, check_out, total_price],
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

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rows } = await pool.query(
        `DELETE FROM bookings WHERE id = ${id}`
      );
      res.status(202).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new bookingController();
