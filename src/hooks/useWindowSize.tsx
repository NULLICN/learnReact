import { useEffect, useState } from "react";

function useWindowSize(isActive = true) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // 未激活时不添加监听器，直接返回
    if (!isActive) return;

    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isActive]); // 将 isActive 加入依赖，开关变化时重新执行副作用

  return size;
}

export default useWindowSize;
