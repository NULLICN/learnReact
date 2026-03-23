import AboutProps from "./pages/aboutProps";
import ComponentFeature from "./pages/componentFeature";
import ComponentState from "./pages/componentState";
import ConditionRendering from "./pages/conditionRendering";
import Home from "./pages/home";
import KeepAliveState from "./pages/keepAliveState";
import RenderList from "./pages/renderList";
import StateManagement from "./pages/stateManagement";

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
    </>
  );
}

export default App;
