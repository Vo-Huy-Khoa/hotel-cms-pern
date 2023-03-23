import pool from "../../configs";
import { Request, Response } from "express";

const users = [
  {
    name: "vo huy khoa",
    email: "huykhoa630@gmail.com",
    identity_number: "206444928",
    phone: "0977425396",
  },
  {
    name: "anhthy",
    email: "anhthy@gmail.com",
    identity_number: "206444928",
    phone: "0796565798",
  },
  {
    full_name: "Ngoc Khue",
    email: "ngockhue0@gmail.com",
    identity_number: "206444928",
    phone: "0977425396",
  },
  {
    full_name: "Jennie",
    email: "jennie@gmail.com",
    identity_number: "206444928",
    phone: "0977425396",
  },
];

const seederClient = async (req: Request, res: Response) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Insert each user in parallel
    await Promise.all(
      users.map(async (user) => {
        const insertQuery =
          "INSERT INTO clients(name, email, identity_number, phone) VALUES($1, $2, $3, $4)";
        const insertValues = [
          user.name,
          user.email,
          user.identity_number,
          user.phone,
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

export { seederClient };
