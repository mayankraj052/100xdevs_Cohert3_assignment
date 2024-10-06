// import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
function App() {
  const [count, setCount] = useState(0);
  // hoocks
  return (
    <div id="first">
      <h1>Counter app</h1>
      <p>count:{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment count by one
      </button>
      <button onClick={() => setCount(count - 1)}>Decrease count by one</button>
    </div>
  );
}

export default App;
