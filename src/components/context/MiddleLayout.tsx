import { useContext } from "react";
import { LevelContext } from "./LevelContext";

export default function MiddleLayout({ children }: { children: React.ReactNode }) {
    const level = useContext(LevelContext);
    return (
        <>
            <div className="border-2 border-green-500 p-4">
                <p>中间布局组件，内容如下：level:{level}</p>
                {children}
            </div>
        </>
    );
}