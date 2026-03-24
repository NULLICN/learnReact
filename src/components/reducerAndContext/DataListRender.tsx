// 此组件使用reducer与context来展示和修改数据
import { useTasks, useTasksDispatch } from "./DatasContext";
export default function DataListRender() {
  const tasks = useTasks();
  
  return (
    <>
      <ul>
        {tasks.map((task: any) => (
          <Item key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
}

function Item({ task }: { task: any }) {
  const dispatch = useTasksDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() =>
          dispatch({ type: "changed", task: { ...task, done: !task.done } })
        }
      />
      <input
        type="text"
        value={task.text}
        onChange={(e) =>
          dispatch({ type: "changed", task: { ...task, text: e.target.value } })
        }
      />
      <button
        className="btn-s-red"
        onClick={() => dispatch({ type: "deleted", id: task.id })}
      >
        Delete
      </button>
      <button
        className="btn-s-normal"
        onClick={() => {
          console.log(task);
        }}
      >
        review
      </button>
      <button
        className="btn-s-normal"
        onClick={() => {
          dispatch({ type: "changed", task: { ...task, newData: "NULLICN" } });
        }}
      >
        rewrite
      </button>
    </li>
  );
}
