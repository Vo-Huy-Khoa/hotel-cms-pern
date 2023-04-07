import pool from "../configs";
import { Request, Response } from "express";

class roomController {
  // Retrieve all users from the database
  async getAll(req: Request, res: Response) {
    try {
      const query = `
          SELECT rooms.id, room_types.name as room_type, rooms.name, rooms.description, 
          rooms.image, rooms.status, rooms.created_at, rooms.updated_at
          FROM rooms JOIN room_types 
          ON rooms.room_type_id=room_types.id ORDER BY id DESC`;
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async count(req: Request, res: Response) {
    try {
      const query = "SELECT COUNT(*) FROM rooms;";
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { room_type_id, name, description, image, status } = req.body;

      const initValue = [room_type_id, name, description, image, status];

      const insertQuery =
        "INSERT INTO rooms(room_type_id, name, description, image, status) VALUES($1, $2, $3, $4, $5) RETURNING *";
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
      const { rows } = await pool.query(`SELECT * FROM rooms WHERE id = ${id}`);
      res.status(202).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async search(req: Request, res: Response) {
    try {
      const { room_type_id, name, status } = req.body;
      const insertQuery = `
        SELECT rooms.id, room_types.name as room_type, rooms.name, rooms.description,
        rooms.image, rooms.status, rooms.created_at, rooms.updated_at
        FROM rooms JOIN room_types
        ON rooms.room_type_id=room_types.id  
        WHERE room_type_id::text LIKE '%${room_type_id}%' AND rooms.name ILIKE '%${name}%'
        AND rooms.status::text LIKE '%${status}%'
        ORDER BY id DESC`;
      const { rows } = await pool.query(insertQuery);
      res.status(202).json(rows);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, room_type_id, name, description, image, status } = req.body;

      const query = {
        text: "UPDATE rooms SET room_type_id = $2, name = $3, description = $4, image = $5, status = $6 WHERE id = $1",
        values: [id, room_type_id, name, description, image, status],
      };
      const { rowCount } = await pool.query(query);
      if (rowCount === 0) {
        return res.status(404).json({ error: "rooms not found" });
      }
      res.status(202).json({ message: "rooms updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rows } = await pool.query(`DELETE FROM rooms WHERE id = ${id}`);
      res.status(202).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new roomController();
