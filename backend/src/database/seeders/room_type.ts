import pool from "../../configs";
import { Request, Response } from "express";

const room_type = [
  {
    name: "Phong 2 nguoi",
    limit: 2,
    price: "500000",
  },
  {
    name: "Phong 3 nguoi",
    limit: 3,
    price: "700000",
  },
  {
    name: "Phong 4 nguoi",
    limit: 4,
    price: "1000000",
  },
];

const seederRoomType = async (req: Request, res: Response) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Insert each user in parallel
    await Promise.all(
      room_type.map(async (room) => {
        const insertQuery =
          "INSERT INTO room_types(name, limit, price) VALUES($1, $2, $3)";
        const insertValues = [room.name, room.limit, room.price];
        await pool.query(insertQuery, insertValues);
      })
    );

    // Commit the transaction
    const { rows } = await pool.query("COMMIT");
    res.status(201).json(rows);
  } catch (err) {
    console.log(err);
    // Rollback the transaction if there was an error
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "Data seeding error" });
  }
};

export { seederRoomType };
