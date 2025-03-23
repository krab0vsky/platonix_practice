import express from 'express';
import mysql from 'mysql2';
import path from 'path'; 
import exphbs from 'express-handlebars';
import { fileURLToPath } from 'url';
import todoRoutes from './routes/todos.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}))

app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(todoRoutes)


const connection = mysql.createConnection({
  host: 'platon.teyhd.ru', 
  user: 'student', 
  password: 'studpass',
  database: 'Ilya_todo',
  port: 3407,
  charset: 'utf8mb4_0900_ai_ci',
});


connection.connect((err) => {
  if (err) {
    console.error('Ошибка при подключении к Базе данных:', err);
    return;
  }
  console.log('Подключение к Базе данных успешно!');

  app.listen(PORT, () => {
    console.log(`Server has been started...`)
  });
});




