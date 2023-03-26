import pool from "../../configs";
import { Request, Response } from "express";

const room = [
  {
    room_type_id: 2,
    name: "Room 201",
    description: "Room 201 is the best",
    image: 2,
    status: false,
  },
  {
    room_type_id: 2,
    name: "Room 202",
    description: "Room 202 is the best",
    image: 2,
    status: true,
  },
  {
    room_type_id: 3,
    name: "Room 203",
    description: "Room 203 is the best",
    image: 2,
    status: true,
  },
];

const seederRoom = async (req: Request, res: Response) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Insert each user in parallel
    await Promise.all(
      room.map(async (room) => {
        const insertValues = [
          room.room_type_id,
          room.name,
          room.description,
          room.image,
          room.status,
        ];
        const insertQuery =
          "INSERT INTO rooms(room_type_id, name, description, image , status) VALUES($1, $2, $3, $4, $5)";

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

export { seederRoom };
