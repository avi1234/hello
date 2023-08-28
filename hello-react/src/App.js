import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

const Article = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
      <h2>{props.author}</h2>
    </>
  )
}

const App = () => {

  const [counter, setCounter] = useState(0);

  //happens asap when the second array values is changed (empty means once)
  useEffect(() => {
    console.log(`counter changed to ${counter}`);
  }, [counter]);

  const name = 'John';
  const isNameShowing = false;

  return (
    <div className="App">
      <h1>Hello {isNameShowing ? name : 'blu'}</h1>
      <Article title="World Peace!" author="John C." />
      <Article title="Happy Hour" author="Jane A." />

      <div>
        <h2>{counter}</h2>
        <button onClick={() => setCounter((c) => c-1)}>-</button>
        <button onClick={() => setCounter((c) => c+1)}>+</button>
      </div>
    </div>
  );
}

export default App;
