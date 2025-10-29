import pkg from 'pg';
import dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'development';
dotenv.config()
const port = process.env.DB_PORT;
const{Pool} = pkg


const openConnection = () => {
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: environment === 'development' ? process.env.DB_NAME : 
  process.env.TEST_DB_NAME,   
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
return pool
}
const pool = openConnection()
export {pool}