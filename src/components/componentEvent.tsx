import { useState } from "react";

export default function ComponentEvent() {
  return (
    <>
      <Viewer source="https://example.com/resource" type="image" />
      <PreventEvent />
    </>
  );
}

function Viewer({ source, type }: { source: string; type: string }) {
  const [feedback, setFeedback] = useState(
    `已就绪类型为${type}的资源${source}`,
  );
  return (
    <>
      <p>{feedback}</p>
      <button
        className="btn"
        onClick={() => setFeedback(`正在观测类型为${type}的资源${source}`)}
      >
        Click Me!
      </button>
    </>
  );
}

function PreventEvent() {
  const [parentMes, setParentMes] = useState("父元素等待点击事件");
  const [childMes, setChildMes] = useState("子元素等待点击事件");
  const [parentMesStyle, setParentMesStyle] = useState("text-green-500");
  const [childMesStyle, setChildMesStyle] = useState("text-green-500");

  function handleParentClick() {
    setParentMes("父元素被点击了");
    setParentMesStyle("text-red-500");
    setTimeout(() => {
      setParentMes("父元素等待点击事件");
      setParentMesStyle("text-green-500");
    }, 1000);
  }
  function handleChildClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // 阻止事件冒泡
    setChildMes("子元素被点击了");
    setChildMesStyle("text-red-500");
    setTimeout(() => {
      setChildMes("子元素等待点击事件");
      setChildMesStyle("text-green-500");
    }, 1000);
  }
  return (
    <>
      <p className={`${parentMesStyle} transition duration-300`}>父元素：{parentMes}</p>
      <p className={`${childMesStyle} transition duration-300`}>子元素：{childMes}</p>
      <div className="bg-green-300 p-4" onClick={handleParentClick}>
        <p>此段属于父元素，点击触发父元素事件</p>
        <button className="btn" onClick={handleChildClick}>触发子元素事件</button>
      </div>
    </>
  );
}
