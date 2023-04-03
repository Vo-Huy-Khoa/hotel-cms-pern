import pool from "../configs";
import { Request, Response } from "express";

class roomTypeController {
  // Retrieve all users from the database
  async getAll(req: Request, res: Response) {
    try {
      const query = "SELECT * FROM room_types ORDER BY id DESC";
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async count(req: Request, res: Response) {
    try {
      const query = "SELECT COUNT(*) FROM room_types;";
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name, count, price } = req.body;
      const initValue = [name, count, price];

      const insertQuery =
        "INSERT INTO room_types(name, count, price) VALUES($1, $2, $3) RETURNING *";
      const { rows } = await pool.query(insertQuery, initValue);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Create Room Type Fail!" });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rows } = await pool.query(
        `SELECT * FROM room_types WHERE id = ${id}`
      );
      res.status(202).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, name, count, price } = req.body;
      const query = {
        text: "UPDATE room_types SET name = $2, count = $3, price = $4 WHERE id = $1",
        values: [id, name, count, price],
      };
      const { rowCount } = await pool.query(query);
      if (rowCount === 0) {
        return res.status(404).json({ error: "room_types not found" });
      }
      res.status(202).json({ message: "room_types updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rows } = await pool.query(
        `DELETE FROM room_types WHERE id = ${id}`
      );
      res.status(202).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new roomTypeController();
