import { useState } from "react";

export default function Home() {
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

  const [count, setCount] = useState(1);

  const [lists, setLists] = useState<Person[]>([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
  ]);

  const numberList = [1, 2, 3, 4, 5].map((num) => {
    return <li key={num}>{num}</li>;
  });

  function handleCount() {
    console.log("clicked");
    const result = count * 2;
    setCount(result);
  }

  function changeList() {
    setLists((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      if (prev[0].name !== "NULLICN") {
        copy[0] = { ...copy[0], name: "NULLICN" };
      } else {
        copy[0] = { ...copy[0], name: "John" };
      }
      return copy;
    });
  }

  return (
    <>
      <section>
        <Counter count={count} handleCount={handleCount} />
      </section>

      <section>
        <ul>
          {lists.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <button className="btn" onClick={changeList}>
          Change list
        </button>
      </section>

      <section>
        <ul>{numberList}</ul>
      </section>
      
    </>
  );
}
