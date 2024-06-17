import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Todo from './components/todo';

function App() {
  const [userName, setUsername] = useState('')

  useEffect(() => {
    getNames();

  }, [])

  const getNames = async () => {
    const response = await axios.get('/name');
    console.log(response);
  }

  const todo = [
    { id: 1, title: 'wash dishes', completed: false },
    { id: 2, title: 'wash car', completed: true }
  ]

  return (
    <div className="App">
      {todo.map((todo) => {
        return (<Todo todo={todo} />)
      })}
    </div>

  );
}

export default App;
