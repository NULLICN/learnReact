import { useState } from "react";
export default function ConditionRendering() {
    const [allowRender, setAllowRender] = useState(false);

    let content = "Content is allowed to render by variable";
    if (!allowRender) {
        content = "Content is not allowed to render by variable";
    }
    return (
        <>
            <section>
                <div>
                    {allowRender ? "Content is allowed to render" : "Content is not allowed to render"} by syntax"? :"
                </div>
                <div>
                    {allowRender && "Content is allowed to render "} by syntax "&&"
                </div>
                <div>
                    {content} by "variable"
                </div>
                <button className="btn" onClick={() => setAllowRender(!allowRender)}>
                    Toggle Render
                </button>
            </section>
        </>
    );
}