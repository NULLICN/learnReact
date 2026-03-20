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
        <LearnProps {...props} />
        <button className="btn" onClick={handleProps}>
          Change Props
        </button>
      </section>
    </>
  );
}
