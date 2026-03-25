import {useRef,useState} from "react";

export default function RefTimeout() {
    let timer = useRef<ReturnType<typeof setTimeout> | null>(null); // 保留数据不会被组件状态更新刷掉
    const [count, setCount] = useState(0);
    function startTimer() {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        setCount(count + 1);
        timer.current = setTimeout(() => {
            setCount(0);
        }, 1000);
    }
    return(
        <>
            <section>
                <p>ref管理计时器，组件刷新次数：{count}</p>
                <button className="btn-s-normal" onClick={startTimer}>Start Timer</button>
            </section>
        </>
    )
}