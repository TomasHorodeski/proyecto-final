import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4'
});

(async () => {
  try {
    await pool.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
  } catch (e) {
    console.warn('No se pudo ejecutar SET NAMES:', e.message);
  }
})();

export async function testConnection() {
  const [rows] = await pool.query('SELECT 1 AS ok');
  return rows?.[0]?.ok === 1;
}



