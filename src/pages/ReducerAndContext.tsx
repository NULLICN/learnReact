import { useImmerReducer } from "use-immer";
export default function ReducerAndContext() {
    return (
        <>
            <section>

            </section>
        </>
    )
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];

/**
 * 使用reducer管理状态与context深层传递
 * 要求：
 *  1.数组数据列表渲染
 *  2.对数组数据进行增删改操作
 *  3.使用Context实现深层组件传递
 */