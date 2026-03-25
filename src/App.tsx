import AboutProps from "./pages/AboutProps";
import ComponentFeature from "./pages/ComponentFeature";
import ComponentState from "./pages/ComponentState";
import ConditionRendering from "./pages/ConditionRendering";
import ContextRelay from "./pages/ContextRelay";
import Home from "./pages/Home";
import KeepAliveState from "./pages/KeepAliveState";
import RenderList from "./pages/RenderList";
import StateByReducer from "./pages/StateByReducer";
import StateManagement from "./pages/StateManagement";
import ReducerAndContext from "./pages/ReducerAndContext";
import RefAndState from "./pages/RefAndState";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
