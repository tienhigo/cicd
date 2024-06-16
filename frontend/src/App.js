import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import todo from './components/todo';

function App() {
  const [userName, setUsername] = useState('')

  useEffect(() => {
    getNames();

  }, [])

  const getNames = async () => {
    const response = await axios.get('/name');
    console.log(response);
  }

  return (
    <div className="App">
      <todo/>
    </div>




  );
}

export default App;
