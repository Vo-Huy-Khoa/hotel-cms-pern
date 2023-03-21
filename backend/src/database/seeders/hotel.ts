import pool from "../../configs";
import { Request, Response } from "express";

const hotels = [
  {
    name: "Son Tra",
    address: "Son Tra, Da Nang",
    phone: "0977425396",
    description: "Hotel is ...",
  },
  {
    name: "Muong Thanh",
    address: "Son Tra, Da Nang",
    phone: "0977425396",
    description: "Hotel is ...",
  },
  {
    name: "Ngu Hanh Son",
    address: "Ngu Hanh Son, Da Nang",
    phone: "0977425396",
    description: "Hotel is ...",
  },
];

const seederHotel = async (req: Request, res: Response) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Insert each user in parallel
    await Promise.all(
      hotels.map(async (hotel) => {
        const insertQuery =
          "INSERT INTO hotels(name, address, phone, description) VALUES($1, $2, $3, $4)";
        const insertValues = [
          hotel.name,
          hotel.address,
          hotel.phone,
          hotel.description,
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

export { seederHotel };
