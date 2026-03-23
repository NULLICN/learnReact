import { useContext } from "react";
import { LevelContext } from "./LevelContext";
export default function Heading() {
    const level = useContext(LevelContext);
    return (
        <>
            <h1>Heading：<span className="text-green-500">{level}</span> </h1>
        </>
    );
}