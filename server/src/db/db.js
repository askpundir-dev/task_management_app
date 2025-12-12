import mysql from "mysql2/promise";
import "dotenv/config";


export const db = await mysql.createConnection(process.env.MYSQL_URL);
