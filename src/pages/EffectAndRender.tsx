import { useEffect, useRef } from "react";
import { useImmer } from "use-immer";
export default function EffectAndRender() {
  const [isShow, setIsShow] = useImmer(false);
  return (
    <>
      <section>
        <p>Effect和Render</p>

        <button
          className="btn-s-normal"
          onClick={() => setIsShow((draft) => !draft)}
        >
          切换显示
        </button>
        {isShow && <AfterRender />}
      </section>
    </>
  );
}

function AfterRender() {
  const [count, setCount] = useImmer(0);
  let timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    console.log("组件渲染完成，取值：", count);
    return () => {
        clearInterval(timer.current!);
    }
  }, [timer]);
  function infinityLoop() {
    timer.current = setInterval(() => {
      setCount((draft) => draft + 1);
      console.log("计时器循环：", count);
    }, 1000);
  }
  return (
    <>
      <p>组件渲染次数：{count}</p>
      <button
        className="btn-s-normal"
        onClick={() => setCount((draft) => draft + 1)}
      >
        增加
      </button>
      <button className="btn-s-normal" onClick={infinityLoop}>
        开始无限循环
      </button>
      <button
        className="btn-s-normal"
        onClick={() => {
          clearInterval(timer.current!);
          timer.current = null;
        }}
      >
        停止无限循环
      </button>
    </>
  );
}
