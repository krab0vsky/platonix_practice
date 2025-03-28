import {Router} from 'express';
import Todo from '../models/Todo.js'
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.findAll({});
    const todosPlain = todos.map(todo => todo.get({ plain: true }));

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos: todosPlain
    });
});



router.get('/create', (req, res) => {
    res.render('create',{
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo ({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/')
})

router.get('/update-todo', async (req, res) => {
    var id = req.query.id;
    var completed = req.query.completed == 1; 
    var todo = await Todo.findByPk(id);
    todo.completed = completed;
    await todo.save();
    res.json({ success: true });
});

export default router;
