const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

const todos = [
  {
    id: 1,
    description: 'Finish homework',
    dueDate: '2026-10-15',
    completed: false
  },
  {
    id: 2,
    description: 'Read chapter 3',
    dueDate: '2026-10-16',
    completed: true
  }
];

app.get('/', (req, res) => {
  res.send('To-do backend is running');
});

app.get('/api/todos', (req, res) => {
  res.send(todos);
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).send('To-do not found');
  }

  res.send(todo);
});

app.post('/api/todos', (req, res) => {
  const todo = {
    id: todos.length + 1,
    description: req.body.description,
    dueDate: req.body.dueDate,
    completed: req.body.completed
  };

  todos.push(todo);
  res.status(201).send(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).send('To-do not found');
  }

  todo.description = req.body.description;
  todo.dueDate = req.body.dueDate;
  todo.completed = req.body.completed;

  res.send(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).send('To-do not found');
  }

  const index = todos.indexOf(todo);
  todos.splice(index, 1);

  res.send(todo);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
