import { useState } from "react";

function useEnabledButton(initialEnabled = true) {
  const [enabled, setEnabled] = useState(initialEnabled);

  const toggle = () => setEnabled((prev) => !prev);

  const Button = () => (
    <button
      className={enabled ? "btn-s-green" : "btn-s-normal"}
      onClick={toggle}
    >
      {enabled ? "启用" : "禁用"}
    </button>
  );

  return { enabled, Button };
}

export default useEnabledButton;
