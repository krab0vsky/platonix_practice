import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize('Ilya_todo', 'student', 'studpass', {
  host: 'platon.teyhd.ru', 
  port: 3407,
  dialect: 'mysql',
   dialectOptions: {
    charset: 'utf8mb4_0900_ai_ci',
  }
});


const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false 
  }
});


export default Todo;

(async () => {
  try {
    await sequelize.sync();
    console.log("База данных и таблицы Todo успешно синхронизированы!");
  } catch (error) {
    console.error("Невозможно синхронизировать базу данных:", error);
  }
})();
