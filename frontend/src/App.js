import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

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
    <>
      <h1>My fronetnd</h1>
      <h3>hello world</h3>
    </>




  );
}

export default App;
