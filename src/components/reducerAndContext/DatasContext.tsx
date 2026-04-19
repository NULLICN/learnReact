/**
 * （内聚）context源，声明了reducer管理与context上下文，提供一个子组件为其注入数据和dispatch方法
 */
import { createContext } from "react";
import { useContext } from "react";
import { useImmerReducer } from "use-immer";

// 声明上下文变量
export const TasksContext = createContext<any>(null);
export const TasksDispatchContext = createContext<any>(null);

// 提供数据上下文
export function useTasks() {
  return useContext(TasksContext);
}
// 提供dispatch上下文
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

// 接收被包裹的子组件，为其提供tasks与dispatch
export function TasksProvider({ children }: any) {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);
  return (
    <>
      {/* 为上下文注入数据 */}
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
          {children}
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </>
  );
}

// 数据与reducer函数
const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];
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