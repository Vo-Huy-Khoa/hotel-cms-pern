import pool from "../../configs";
import { Request, Response } from "express";

const room_type = [
  {
    room_type_id: "Phong 2 nguoi",
    name: 2,
    description: "500000",
    image: 2,
    status: true,
  },
  {
    room_type_id: "Phong 2 nguoi",
    name: 2,
    description: "500000",
    image: 2,
    status: true,
  },
  {
    room_type_id: "Phong 2 nguoi",
    name: 2,
    description: "500000",
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
      room_type.map(async (room) => {
        const insertQuery =
          "INSERT INTO rooms(room_type_id, name, description, image , status) VALUES($1, $2, $3, $4, $5)";
        const insertValues = [
          room.room_type_id,
          room.name,
          room.description,
          room.image,
          room.status,
        ];
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
