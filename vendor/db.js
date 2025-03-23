
import express from 'express';
import mysql from 'mysql2';


let sets = {
    host: 'platon.teyhd.ru',
    user: 'student',
    password: 'studpass',
    database: 'Ilya_todo',
    port: 3407,
    charset: 'utf8mb4_0900_ai_ci',
    waitForConnections: true,
    connectionLimit: 50,
    maxIdle: 50,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0 
}

const app = express();
const pool = mysql.createPool(sets).promise();





 export async function get_users(){
    const qer = `SELECT * from users`
    const [rows, fields] = await pool.query(qer)
    return rows;
 }

 export async function get_users_id(fio){
    const qer = `SELECT * FROM users WHERE fio LIKE "%${fio}%";`
    const [rows, fileds] = await pool.query(qer)
    return rows;
 }  
