/**
 * （耦合）提供reducer管理与context上下文，接受一个子组件为其注入数据和dispatch方法
 */
import { useImmerReducer } from "use-immer";
import { TasksContext, TasksDispatchContext } from "./DatasContext";
export default function DataProvider({ children }: any) {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);
  return (
    <>
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          {children}
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </>
  );
}
/**
 * 使用reducer管理状态与context深层传递
 * 要求：
 *  1.数组数据列表渲染
 *  2.对数组数据进行增删改操作
 *  3.使用Context实现深层组件传递
 */
function tasksReducer(tasks: any, action: any) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t: any) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t: any) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];
