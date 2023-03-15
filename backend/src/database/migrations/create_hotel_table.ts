import pool from "../../configs";

const migrationQuery = `
  CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
`;

function up() {
  pool
    .query(migrationQuery)
    .then(() => console.log("Migration successful"))
    .catch((error) => console.error("Migration error:", error))
    .finally(() => pool.end());
}

function down() {
  pool.query("DROP TABLE hotels", (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Table dropped successfully");
    }
    pool.end();
  });
}
export { up, down };
