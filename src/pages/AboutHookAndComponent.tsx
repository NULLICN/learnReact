import useEnabledButton from "../hooks/useEnabledButton";
import useWindowSize from "../hooks/useWindowSize";

export default function AboutHookAndComponent() {
  const { enabled, Button } = useEnabledButton(false);
  const size = useWindowSize(enabled);

  return (
    <>
      <section>
        <p>利用外部Hook内聚的功能监听窗口大小</p>
        <p>
          当前窗口大小: {size.width} x {size.height}
        </p>
        <Button />
      </section>
    </>
  );
}
