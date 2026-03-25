import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useImmer } from "use-immer";
export default function RefAccessDom() {
  let componentDom = useRef<HTMLParagraphElement | null>(null);
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
    console.log(componentDom.current?.innerText);
  }

  function handleCheckDomState() {}

  return (
    <>
      <section>
        <p>ref获取Dom</p>
        <p ref={componentDom}>点击次数：{count}</p>
        <button className="btn-s-normal" onClick={handleClick}>
          Click Me
        </button>
        <button className="btn-s-normal" onClick={handleCheckDomState}>
          Check DOM State
        </button>
      </section>
      {/* 引用 RefDynamicDoms，同时消除"已声明但从未读取"的 TS 警告 */}
      <section>
        <RefDynamicDoms />
      </section>
    </>
  );
}

function RefDynamicDoms() {
  /**
   * 
    泛型显式指定为 Map<number, HTMLLIElement> | null：
    useRef 初始值为 null，但后续会在 getMap() 中懒初始化为 Map。
    若不声明泛型，TS 会将类型收窄为 MutableRefObject<null>，
    导致 .current 永远只能是 null，无法赋值为 Map。
   */
  let itemsRef = useRef<Map<number, HTMLLIElement> | null>(null);
  /**
   * 
    必须传入函数调用的结果（initializeList()），而非函数引用（initializeList）。
    useImmer 底层直接将第一个参数作为初始 state，不像 useState 支持惰性初始化函数。
    传入函数引用时，items 会被初始化为函数本身而非数组，导致 .map() 无法渲染列表。
   */
  const [items, setItems] = useImmer(initializeList());
  /**
   * 
   * 
    返回值标注为 Map<number, HTMLLIElement>（非 null）：
    函数内部保证了 current 一定被初始化后才返回，
    告知调用方无需再处理 null 分支，消除后续赋值时的类型冲突。
   */
  function getMap(): Map<number, HTMLLIElement> {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  function handleDeleteItem(id: number) {
    flushSync(() => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    });
    console.log(parentRef.current?.lastChild);
  }

  let parentRef = useRef<HTMLUListElement | null>(null);
  return (
    <>
      <p>动态数量的RefDom</p>
      <ul ref={parentRef}>
        {items.map((item) => (
          <li
            key={item.id}
            ref={(el) => {
              const map: Map<number, HTMLLIElement> = getMap();
              map.set(item.id, el!);

              return () => {
                map.delete(item.id);
              };
            }}
            onClick={() => handleDeleteItem(item.id)}
          >
            id: {item.id} — data: {item.data}
          </li>
        ))}
      </ul>
    </>
  );
}
function initializeList() {
  let items = [];
  for (let i = 0; i < 5; i++) {
    items.push({ id: i, data: Math.floor(Math.random() * 100) });
  }
  return items;
}
