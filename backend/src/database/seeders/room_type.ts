import pool from "../../configs";
import { Request, Response } from "express";

const room_type = [
  {
    name: "Phong 2 nguoi",
    count: 1,
    price: "500000",
  },
  {
    name: "Phong 3 nguoi",
    count: 2,
    price: "700000",
  },
  {
    name: "Phong 4 nguoi",
    count: 3,
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
        const insertValues = [room.name, room.count, room.price];
        const insertQuery =
          "INSERT INTO room_types(name, count, price) VALUES($1, $2, $3)";
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
