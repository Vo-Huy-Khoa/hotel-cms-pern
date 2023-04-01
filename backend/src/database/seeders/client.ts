import pool from "../../configs";
import { Request, Response } from "express";

const clients = [
  {
    name: "Vo Huy Khoa",
    email: "huykhoa630@gmail.com",
    identity_number: "206444928",
    phone: "0977425396",
  },
  {
    name: "Tran Thi Anh Thy",
    email: "anhthy@gmail.com",
    identity_number: "206444928",
    phone: "0796565798",
  },
  {
    name: "Vo Doan Ngoc Khue",
    email: "ngockhue0@gmail.com",
    identity_number: "206444928",
    phone: "0977425396",
  },
  {
    name: "Jennie",
    email: "jennie@gmail.com",
    identity_number: "206444928",
    phone: "0977425396",
  },
];

const seederClient = async (req: Request, res: Response) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Insert each client in parallel
    await Promise.all(
      clients.map(async (client) => {
        const insertValues = [
          client.name,
          client.email,
          client.identity_number,
          client.phone,
        ];
        const insertQuery =
          "INSERT INTO clients(name, email, identity_number, phone) VALUES($1, $2, $3, $4)";

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
