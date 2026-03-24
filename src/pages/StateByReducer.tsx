import { useState } from "react";
import { useImmerReducer } from "use-immer";

export default function StateByReducer() {
  // ✅ state 是当前任务列表，由 reducer 管理
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialState);
  const [inputText, setInputText] = useState("");

  function handleAddTask(text: string) {
    dispatch({ type: "add", data: text });
    setInputText("");
  }

  function handleChangeTask(task: { id: number; data: string }) {
    dispatch({ type: "change", data: task });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({ type: "delete", id: taskId });
  }

  return (
    <>
      <section>
        <p>Reducer 状态管理函数</p>
        <div>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入新任务"
          />
          <button className="btn-s-green" onClick={() => handleAddTask(inputText)}>添加</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                value={task.data}
                onChange={(e) =>
                  handleChangeTask({ id: task.id, data: e.target.value })
                }
              />
              <button className="btn-s-red" onClick={() => handleDeleteTask(task.id)}>删除</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

const initialState = [
  { id: 1, data: "任务一" },
  { id: 2, data: "任务二" },
  { id: 3, data: "任务三" },
];

// ❌ 错误写法：({ tasks, action }: { tasks: any; action: any })
// React 的 reducer 函数签名必须是两个独立参数 (state, action)
// 而不是一个解构对象，否则 TypeScript 会将函数视为无参函数，
// 导致 dispatch() 报"应有 0 个参数"，且 initialState 数组无法匹配 { tasks, action } 对象类型
// ✅ 正确写法：(tasks: Task[], action: Action)
function tasksReducer(
  draft: { id: number; data: string }[],
  action: { type: string; data?: any; id?: number },
) {
  switch (action.type) {
    case "add": {
      draft.push({ id: Date.now(), data: action.data });
      break;
    }
    // ❌ 原代码缺少 "change" case，dispatch({ type: "change" }) 会直接走 default 不处理
    // ✅ 正确：在 change case 中更新对应 id 的任务数据
    case "change": {
      const task = draft.find((task) => task.id === action.data.id);
      if (task) {
        task.data = action.data.data;
      }
      break;
    }
    case "delete": {
      const index = draft.findIndex((task) => task.id === action.id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
      break;
    }
    default: {
      return draft;
    }
  }
}
