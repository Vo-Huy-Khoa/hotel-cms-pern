import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const { Pool } = require("pg");
const bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Khởi tạo một đối tượng pool để kết nối đến PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Lấy tất cả các user từ bảng users
app.get("/users", (req, res) => {
  pool.query(
    "SELECT * FROM users ORDER BY id ASC",
    (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

app.get("/create", (req: Request, res: Response) => {
  pool.query(
    `
  CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    salary REAL
  );
`,
    (err: Error, res: Response) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Table created successfully");
      pool.end();
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
