import { useState } from "react";

type CounterProps = {
  count: number;
  handleCount: () => void;
};

function Counter({ count, handleCount }: CounterProps) {
  return (
    <button className="btn" onClick={handleCount}>
      Click Me! Count: {count}
    </button>
  );
}

type Person = { id: number; name: string };

function App() {
  const [count, setCount] = useState(1);

  const [lists, setLists] = useState<Person[]>([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
  ]);

  function handleCount() {
    console.log("clicked");
    const result = count * 2;
    setCount(result);
  }

  function changeList() {
    setLists((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      copy[0] = { ...copy[0], name: "NULLICN" };
      return copy;
    });
  }

  return (
    <>
      <Counter count={count} handleCount={handleCount} />
      <ul>
        {lists.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
      <button className="btn" onClick={changeList}>
        Change list
      </button>
    </>
  );
}

export default App;
