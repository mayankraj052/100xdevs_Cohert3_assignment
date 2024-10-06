import { useState, useEffect } from 'react';
import './App.css';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <h1 id="text">{count}</h1>
    </div>
  );
}

function ToggleMessage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Message
      </button>
      {isVisible && <p>This message is conditionally rendered!</p>}
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <ToggleMessage />
    </div>
  );
}

export default App;
