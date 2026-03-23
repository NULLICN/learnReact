export default function MiddleLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="border-2 border-green-500 p-4">
                <p>中间布局组件，内容如下：</p>
                {children}
            </div>
        </>
    );
}