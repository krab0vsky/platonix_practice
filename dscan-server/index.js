const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const dbConfig = {
  host: 'platon.teyhd.ru',
  port: 3407,
  user: 'student',
  password: 'studpass',
  database: 'dscan'
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [allDevices] = await connection.execute(`
      SELECT id, mac, ip, name, os_guess, vendor, type, last_seen, connected, verified
      FROM devices
      ORDER BY last_seen DESC
    `);

    const totalDevices = allDevices.length;
    const connectedDevices = allDevices.filter(d => d.connected === 1).length;
    const disconnectedDevices = allDevices.filter(d => d.connected === 0).length;

    const template = fs.readFileSync(path.join(__dirname, 'views', 'index.html'), 'utf8');
    const finalHtml = template
      .replace('{{devicesJson}}', JSON.stringify(allDevices).replace(/</g, '\u003c'))
      .replace('{{dataTotal}}', totalDevices)
      .replace('{{dataConnected}}', connectedDevices)
      .replace('{{dataDisconnected}}', disconnectedDevices);

    res.send(finalHtml);
    await connection.end();

  } catch (err) {
    console.error('Ошибка:', err.message);
    res.status(500).send('Ошибка при получении данных');
  }
});

app.get('/history', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [allDevices] = await connection.execute(`
      SELECT id, mac, ip, name, os_guess, vendor, type, last_seen, connected, verified
      FROM devices
      ORDER BY last_seen DESC
    `);

    const devicesList = allDevices.map(device => `
      <tr>
        <td>${device.name || 'Без имени'}</td>
        <td>${device.ip}</td>
        <td>${device.mac}</td>
        <td>${new Date(device.last_seen).toLocaleString()}</td>
        <td class="${device.connected ? 'on' : 'off'}">${device.connected ? 'Подключен' : 'Отключен'}</td>
      </tr>
    `).join('');

    const template = fs.readFileSync(path.join(__dirname, 'views', 'history.html'), 'utf8');
    const finalHtml = template.replace('{{devicesList}}', devicesList);

    res.send(finalHtml);
    await connection.end();

  } catch (err) {
    console.error('Ошибка при загрузке истории:', err.message);
    res.status(500).send('Ошибка при загрузке истории');
  }
});

app.listen(port, () => {
  console.log('Сервер работает на порту 3000');
});
