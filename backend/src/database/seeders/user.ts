import pool from "../../configs";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const users = [
  {
    user_name: "khoavh",
    full_name: "Vo Huy Khoa",
    email: "khoavh@gmail.com",
    password: "1",
    status: "1",
  },
  {
    user_name: "ngockhue",
    full_name: "Vo Doan Ngoc Khue",
    email: "ngockhue0@gmail.com",
    password: "1",
    status: "1",
  },
  {
    user_name: "jennie",
    full_name: "Jennie",
    email: "jennie@gmail.com",
    password: "1",
    status: "1",
  },
  {
    user_name: "thaodoan",
    full_name: "Doan Thi Thao",
    email: "thaodoan@gmail.com",
    password: "1",
    status: "1",
  },
  {
    user_name: "trungdien",
    full_name: "Vo Trung Dien",
    email: "trungdien@gmail.com",
    password: "1",
    status: "0",
  },
  {
    user_name: "thytran",
    full_name: "Tran Thi Anh Thy",
    email: "thytran@gmail.com",
    password: "1",
    status: "0",
  },
];

const seederUser = async (req: Request, res: Response) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Insert each user in parallel
    await Promise.all(
      users.map(async (user) => {
        const insertValues = [
          user.user_name,
          user.full_name,
          user.email,
          await bcrypt.hash(user.password, 10),
          user.status,
        ];
        const insertQuery =
          "INSERT INTO users(user_name, full_name, email, password, status) VALUES($1, $2, $3, $4, $5)";

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

export { seederUser };
