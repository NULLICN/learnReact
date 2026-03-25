import RefTimeout from "../components/ref/RefTimeout"
import RefAccessDom from "../components/ref/RefAccessDom"
export default function RefAndState() {
    return(
        <>
        <section>
            <h2>Ref和State的区别</h2>
            <p>Ref和State都是React中用于存储数据的方式，但它们有一些重要的区别：</p>
            <RefTimeout />
            <RefAccessDom />
        </section>
        </>
    )
}