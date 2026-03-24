import { useImmer } from "use-immer";
export default function ComponentState() {
    // 对象修改
    const [deepObject, setDeepObject] = useImmer({
        level1: {
            level2: {
                level3: "initial value"
            }
        }
    });
    const [updateStyle, setUpdateStyle] = useImmer("text-green-500");

    function handleChildClick() {
        setDeepObject(draft => {
            if(draft.level1.level2.level3 === "initial value") {
                draft.level1.level2.level3 = "updated value";
            } else {
                draft.level1.level2.level3 = "initial value";
            }
        });
        setUpdateStyle(draft => {
            if(draft === "text-green-500") {
                return "text-red-500";
            } else {
                return "text-green-500";
            }
        });
    }

    // 数组修改
    const [numberList, setNumberList] = useImmer([1, 2, 3, 4, 5]);
    function handleArrayClick() {
        setNumberList(draft => {
            draft.push(draft.length + 1);
        });
    }
    return (
        <>
        <section>
            <p>useImmer库便捷更新深层对象数据</p>
            <p>deepObject.level1.level2.level3: <span className={updateStyle}>{deepObject.level1.level2.level3}</span></p>
            <button className="btn" onClick={handleChildClick}>更新值</button>
        </section>
        <section>
            <p>useImmer更新数组</p>
            <p>数组内容: {numberList.join(" ")}</p>
            <button className="btn" onClick={handleArrayClick}>添加元素</button>
            <button className="btn" onClick={() => setNumberList(draft => { draft.splice(Math.floor(Math.random() * draft.length), 1); })}>随机删除</button>
        </section>
        </>
    )
}
