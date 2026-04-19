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
    {/* 一个计算器，用到了由状态管理(useState)来管理的变量count
        使用了一个处理函数来更新count的值，它们目前是耦合的
    */}
      <section>
        <Counter count={count} handleCount={handleCount} />
      </section>

      {/* 列表渲染，用js控制渲染内容，从一个被状态管理的数组中读取 */}
      <section>
        <ul>
          {lists.map(({ id, name }) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        {/* 这个处理函数更改了数组数据 */}
        <button className="btn" onClick={changeList}>
          Change list
        </button>
      </section>

      {/* 一个变量，但是已经提前计算好列表渲染内容了 */}
      <section>
        <ul>{numberList}</ul>
      </section>
      
    </>
  );
}
