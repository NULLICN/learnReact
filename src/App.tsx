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

function App() {
  let parentDom = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollToBottom();
  }, []);

  function scrollToBottom() {
    const el = parentDom.current!;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }
  return (
    <>
      <div ref={parentDom} style={{ height: "100vh", overflow: "auto" }}>
        <Home />
        <AboutProps />
        <RenderList />
        <ConditionRendering />
        <ComponentFeature />
        <ComponentState />
        <StateManagement />
        <KeepAliveState />
        <StateByReducer />
        <ContextRelay />
        <ReducerAndContext />
        <RefAndState />
        <EffectAndRender />
      </div>
    </>
  );
}

export default App;
