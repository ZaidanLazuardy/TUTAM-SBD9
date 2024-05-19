const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const path = require('path');

const app = express();
const db = pgp('postgres://username:password@localhost:5432/todos');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/todos', async (req, res) => {
  const todos = await db.any('SELECT * FROM todos');
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const newTodo = await db.one('INSERT INTO todos(text) VALUES($1) RETURNING *', req.body.text);
  res.json(newTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await db.none('DELETE FROM todos WHERE id = $1', req.params.id);
  res.json({ message: 'Todo deleted' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(5000, () => console.log('Server is running'));
