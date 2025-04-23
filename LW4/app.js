const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

let tasks = [
  { id: 1, text: 'Опанувати JavaScript', completed: false },
  { id: 2, text: 'Опанувати Node.js', completed: false },
  { id: 3, text: 'Опанувати HTML та CSS', completed: true },
  { id: 4, text: 'Опанувати Git та GitHub', completed: true }
];

app.get('/', (req, res) => {
  res.render('index', {
    tasks: tasks
  });
});

app.post('/add', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    text: req.body.taskText,
    completed: false
  };
  tasks.push(newTask);
  res.redirect('/');
});

app.post('/toggle/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.map(task => 
    task.id === taskId ? {...task, completed: !task.completed} : task
  );
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});