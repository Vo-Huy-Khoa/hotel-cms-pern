import pool from "../../configs";
import { Request, Response } from "express";

const users = [
  {
    user_name: "khoavh",
    full_name: "vo huy khoa",
    email: "huykhoa630@gmail.com",
    password: "1",
    identity_number: "2006444928",
    phone: "0977425396",
    avatar: "avatar",
    role: "0",
  },
  {
    user_name: "anhthy",
    full_name: "Anh Thy",
    email: "anhthy@gmail.com",
    password: "1",
    identity_number: "2006444928",
    phone: "0977425396",
    avatar: "avatar",
    role: "0",
  },
  {
    user_name: "ngockhue",
    full_name: "Ngoc Khue",
    email: "ngockhue0@gmail.com",
    password: "1",
    identity_number: "2006444928",
    phone: "0977425396",
    avatar: "avatar",
    role: "1",
  },
  {
    user_name: "jennie",
    full_name: "Jennie",
    email: "jennie@gmail.com",
    password: "1",
    identity_number: "2006444928",
    phone: "0977425396",
    avatar: "avatar",
    role: "1",
  },
];

const seederUser = async (req: Request, res: Response) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Insert each user in parallel
    await Promise.all(
      users.map(async (user) => {
        const insertQuery =
          "INSERT INTO users(user_name, full_name, email, password, identity_number, phone, avatar, role) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";
        const insertValues = [
          user.user_name,
          user.full_name,
          user.email,
          user.password,
          user.identity_number,
          user.phone,
          user.avatar,
          user.role,
        ];
        await pool.query(insertQuery, insertValues);
      })
    );

    // Commit the transaction
    const { rows } = await pool.query("COMMIT");
    res.status(201).json(rows[0]);
  } catch (err) {
    console.log(err);
    // Rollback the transaction if there was an error
    await pool.query("ROLLBACK");
    res.status(500).json({ error: "Data seeding error" });
  }
};

export { seederUser };
