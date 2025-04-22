const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const dbConfig = {
  host: 'platon.teyhd.ru',
  port: 3407,
  user: 'student',
  password: 'studpass',
  database: 'dscan'
};

app.get('/devices', async function(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const sql = `
      SELECT id, mac, ip, name, os_guess, vendor, type, last_seen, connected, verified
      FROM devices
      WHERE connected = 1
      ORDER BY last_seen DESC
    `;

    const [rows, fields] = await connection.execute(sql);

    res.json(rows);
    await connection.end();

  } catch (err) {
    console.log('Ошибка:', err.message);
    res.status(500).send('Произошла ошибка при получении данных');
  }
});

app.listen(port, function() {
  console.log('Сервер работает на порту 3000');
});
