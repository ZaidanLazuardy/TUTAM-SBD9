import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('/api/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post('/api/todos', { text: input });
    setInput('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
