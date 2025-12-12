import mysql from "mysql2/promise";
import "dotenv/config";


// const url = parse(process.env.MYSQL_URL);

export const db = await mysql.createConnection(process.env.MYSQL_URL);
