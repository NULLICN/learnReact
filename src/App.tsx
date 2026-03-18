import { useState } from "react";

type CounterProps = {
  count: number;
  handleCount: () => void;
};

function Counter({ count, handleCount }: CounterProps) {
  return <button className="btn" onClick={handleCount}>Click Me! Count: {count}</button>;
}

function App() {
  const [count, setCount] = useState(1);
  function handleCount() {
    console.log("clicked");
    const result = count * 2;
    setCount(result);
  }
  return (
    <>
      <Counter count={count} handleCount={handleCount} />
    </>
  );
}

export default App;
