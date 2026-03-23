import { useState } from "react";
import { useImmer } from "use-immer";

function Counter({ name }: { name: string }) {
  const [count, setCount] = useState(0);
  function handleCount() {
    console.log("count", count);
    setCount((draft) => (draft += 1));
  }
  return (
    <>
      <p>count: {count}</p>
      <button className="btn" onClick={handleCount}>
        {name}
      </button>
    </>
  );
}

export default function KeepAliveState() {
  const [isExchange, setIsExchange] = useState(false);
  const [componentState, setComponentState] = useImmer(
    <Counter name="counter 1" />,
  );
  const [isClear, setIsClear] = useState(false);

  function handleChangeComponentState() {
    setIsExchange(!isExchange);
    if (isExchange) {
      setComponentState(<Counter name="counter 1" key="counter1" />);
    } else {
      setComponentState(<Counter name="counter 2" key="counter2" />);
    }
  }

  function handleClearComponent() {
    if (isClear) {
      setIsClear(false);
    } else {
      setIsClear(true);
    }
  }

  return (
    <>
      <section>
        <div>{componentState}</div>
        <button
          className="btn"
          onClick={() => setComponentState(<p>破坏组件保活</p>)}
        >
          破坏组件保活
        </button>
        <button className="btn" onClick={handleChangeComponentState}>
          Change Counter
        </button>
      </section>
      <section>
        <p>清除组件但保留状态</p>
        <div className="w-100% p-2 border rounded">
          <div style={{ display: isClear ? "none" : "block" }}>
            <Counter name="counter 3" />
          </div>
        </div>
        <button className="btn" onClick={handleClearComponent}>
          {isClear ? "清除组件" : "恢复组件"}
        </button>
      </section>
    </>
  );
}
