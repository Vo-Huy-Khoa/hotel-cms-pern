import pool from "../configs/db";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`;

const migrationUser = () => {
  pool
    .query(migrationQuery)
    .then(() => console.log("Migration successful"))
    .catch((error) => console.error("Migration error:", error))
    .finally(() => pool.end());
};
