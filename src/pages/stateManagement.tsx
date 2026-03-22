import { useEffect, useRef } from "react";
import { useImmer } from "use-immer";

export default function StateManagement() {
  const [text, setText] = useImmer("");
  const [textareaStatus, setTextareaStatus] = useImmer({
    waiting: true,
    typing: false,
    isSubmit: false,
  });

  // 保存定时器 id，防止多个定时器叠加
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 防抖函数，监听文本输入，1秒后设置状态为等待输入
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log("输入变化，更新文本和状态");
    setText(e.target.value);
    // 立即标记为"正在输入"
    setTextareaStatus((draft) => {
      draft.waiting = false;
      draft.typing = true;
      draft.isSubmit = false;
    });
    // 清除上一次定时器，重新计时
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
        console.log("输入停止，切换到等待状态");
      setTextareaStatus((draft) => {
        draft.waiting = true;
        draft.typing = false;
        draft.isSubmit = false;
      });
      timerRef.current = null;
    }, 1000);
  }

  // 组件卸载时清理残留定时器
  useEffect(
    () => () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <>
      <section>
        <p>状态管理</p>
        <p>
          {textareaStatus.waiting
            ? "等待输入..."
            : textareaStatus.typing
              ? "正在输入..."
              : textareaStatus.isSubmit
                ? "已提交"
                : ""}
        </p>
        <textarea
          className={`border block m-2 ${textareaStatus.waiting ? "bg-gray-100" : textareaStatus.typing ? "bg-yellow-100" : textareaStatus.isSubmit ? "bg-green-100" : ""}`}
          name="stateManagement"
          id="stateManagement"
          value={text}
          onChange={handleInputChange}
          disabled={textareaStatus.isSubmit}
        ></textarea>
        <button
          className="btn"
          onClick={() =>
            setTextareaStatus({ waiting: false, typing: false, isSubmit: true })
          }
        >
          提交
        </button>
      </section>
    </>
  );
}
