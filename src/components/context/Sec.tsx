import { LevelContext } from "./LevelContext";
export default function Sec({ ctx, children }: { ctx: number; children: React.ReactNode }) {
    return (
        <>
           <LevelContext value={ctx}>
                {children}
            </LevelContext>
        </>
    )
}