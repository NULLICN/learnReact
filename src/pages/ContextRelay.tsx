import Heading from "../components/context/Heading";
import Sec from "../components/context/Sec";
import MiddleLayout from "../components/context/MiddleLayout";
export default function ContextRelay() {
    return (
        <>
            <section>
                <p>Context深层传递</p>
                <p>上层父节点，当前级别：2</p>
                <Sec ctx={2}>
                    <MiddleLayout>
                        <Heading  />
                    </MiddleLayout>
                </Sec>
                <p>上层父节点，当前级别：4</p>
                <Sec ctx={4}>
                    <Heading />
                </Sec>
                <p>上层节点无提供（预期0）</p>
                <Heading />
            </section>       
        </>
    );
}
/* 
使用createContext与useContext实现Context深层传递
在任意深度可以使用到最顶层组件提供的Context值，避免了层层传递props的麻烦
*/