import { useState } from "react";
import LearnProps from "../components/practics/props/learnProps";

export default function AboutProps() {
  const [props, setProps] = useState({
    id: 1,
    tag: "react",
    name: "learn react",
  });

  function handleProps() {
    setProps((prev) => {
      if (prev.tag !== "javascript") {
        return { ...prev, tag: "javascript" };
      } else {
        return { ...prev, tag: "react" };
      }
    });
  }

  return (
    <>
      <section>
        {/* 如果一个组件所接收值的键与数据的键一致，那么可以这样简写 {...props} */}
        <LearnProps {...props} />
        {/* 改变源数据，会让状态管理更新一系列组件 */}
        <button className="btn" onClick={handleProps}>
          Change Props
        </button>
      </section>
    </>
  );
}
