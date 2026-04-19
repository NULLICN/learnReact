import { useEffect, useRef } from "react";

import AboutProps from "./pages/AboutProps";
import ComponentFeature from "./pages/ComponentFeature";
import ComponentState from "./pages/ComponentState";
import ConditionRendering from "./pages/ConditionRendering";
import ContextRelay from "./pages/ContextRelay";
import EffectAndRender from "./pages/EffectAndRender";
import Home from "./pages/Home";
import KeepAliveState from "./pages/KeepAliveState";
import ReducerAndContext from "./pages/ReducerAndContext";
import RefAndState from "./pages/RefAndState";
import RenderList from "./pages/RenderList";
import StateByReducer from "./pages/StateByReducer";
import StateManagement from "./pages/StateManagement";
import AboutHookAndComponent from "./pages/AboutHookAndComponent";

function App() {
  let parentDom = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollToBottom();
  });

  function scrollToBottom() {
    const el = parentDom.current!;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }
  return (
    <>
      <div ref={parentDom} style={{ height: "100vh", overflow: "auto" }}>
        <Home /> {/* 状态管理与列表渲染 */}
        <AboutProps /> {/** 向一个函数组件传入props */}
        <RenderList /> {/** 用数组或对象渲染一个dom列表 */}
        <ConditionRendering /> {/** 条件渲染的三种方式 */}
        <ComponentFeature /> {/** 组件事件 */}
        <ComponentState /> {/** 用useState和useImmer管理状态 */}
        <StateManagement /> {/** 使用ref与useEffect */}
        <KeepAliveState /> {/** 组件在dom树中的渲染位置决定react是否更新组件 */}
        <StateByReducer /> {/** 用useReducer集中管理状态 */}
        <ContextRelay /> {/** props深层传递 */}
        <ReducerAndContext /> { /** 将reducer与context结合使用 */}
        <RefAndState /> {/** ref与state的区别 */}
        <EffectAndRender /> 
        <AboutHookAndComponent /> {/** Hook结合组件使用 */}
      </div>
    </>
  );
}

export default App;
