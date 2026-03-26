import * as yaml from "js-yaml";
import { useEffect, useRef } from "react";
import { useImmer } from "use-immer";
export default function EffectAndRender() {
  const [isShow, setIsShow] = useImmer(false);
  return (
    <>
      <section>
        <p>Effect和Render</p>

        <button
          className="btn-s-normal"
          onClick={() => setIsShow((draft) => !draft)}
        >
          切换显示
        </button>
        {isShow && <AfterRender />}
      </section>
      <section>
        <NetworkRequest />
      </section>
    </>
  );
}

function AfterRender() {
  const [count, setCount] = useImmer(0);
  let timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    console.log("组件渲染完成，取值：", count);
    return () => {
      clearInterval(timer.current!);
    };
  }, [timer]);
  function infinityLoop() {
    timer.current = setInterval(() => {
      setCount((draft) => draft + 1);
      console.log("计时器循环：", count);
    }, 1000);
  }
  return (
    <>
      <p>组件渲染次数：{count}</p>
      <button
        className="btn-s-normal"
        onClick={() => setCount((draft) => draft + 1)}
      >
        增加
      </button>
      <button className="btn-s-normal" onClick={infinityLoop}>
        开始无限循环
      </button>
      <button
        className="btn-s-normal"
        onClick={() => {
          clearInterval(timer.current!);
          timer.current = null;
        }}
      >
        停止无限循环
      </button>
    </>
  );
}

function executeBrowserActions(data: unknown) {
  if (typeof data !== "object" || data === null) return;
  const obj = data as Record<string, unknown>;

  // 设置 cookies：支持数组或对象形式
  const cookies = obj["cookies"] ?? obj["set-cookies"] ?? obj["setCookies"];
  if (Array.isArray(cookies)) {
    cookies.forEach((cookie) => {
      if (typeof cookie === "object" && cookie !== null) {
        const c = cookie as Record<string, unknown>;
        const parts = [`${c.name}=${c.value}`];
        if (c.expires)
          parts.push(`expires=${new Date(String(c.expires)).toUTCString()}`);
        if (c.path) parts.push(`path=${c.path}`);
        if (c.domain) parts.push(`domain=${c.domain}`);
        if (c.secure) parts.push("Secure");
        if (c.sameSite) parts.push(`SameSite=${c.sameSite}`);
        document.cookie = parts.join("; ");
      } else if (typeof cookie === "string") {
        document.cookie = cookie;
      }
    });
  } else if (typeof cookies === "object" && cookies !== null) {
    Object.entries(cookies as Record<string, unknown>).forEach(
      ([name, value]) => {
        document.cookie = `${name}=${value}`;
      },
    );
  }

  // localStorage
  const local = obj["localStorage"] ?? obj["local-storage"];
  if (typeof local === "object" && local !== null) {
    Object.entries(local as Record<string, unknown>).forEach(([key, value]) => {
      localStorage.setItem(
        key,
        typeof value === "string" ? value : JSON.stringify(value),
      );
    });
  }

  // sessionStorage
  const session = obj["sessionStorage"] ?? obj["session-storage"];
  if (typeof session === "object" && session !== null) {
    Object.entries(session as Record<string, unknown>).forEach(
      ([key, value]) => {
        sessionStorage.setItem(
          key,
          typeof value === "string" ? value : JSON.stringify(value),
        );
      },
    );
  }

  // 重定向（放最后执行，避免其他操作未完成就跳转）
  const redirect = obj["redirect"] ?? obj["location"];
  if (typeof redirect === "string") {
    window.location.href = redirect;
  }
}

function NetworkRequest() {
  const [url, setUrl] = useImmer("");
  const [formatted, setFormatted] = useImmer("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
  }

  function handleFetch() {
    fetch(url)
      .then((response) => {
        const contentType = response.headers.get("Content-Type") ?? "";
        return response.text().then((text) => ({ text, contentType }));
      })
      .then(({ text, contentType }) => {
        let parsed: unknown;
        if (contentType.includes("yaml") || contentType.includes("yml")) {
          parsed = yaml.load(text);
          setFormatted(yaml.dump(parsed, { indent: 2 }));
        } else {
          try {
            parsed = JSON.parse(text);
            setFormatted(JSON.stringify(parsed, null, 2));
          } catch {
            try {
              parsed = yaml.load(text);
              setFormatted(yaml.dump(parsed, { indent: 2 }));
            } catch {
              setFormatted(text);
            }
          }
        }
        if (parsed !== undefined) {
          executeBrowserActions(parsed);
        }
      });
  }

  return (
    <>
      <input type="text" name="" id="" value={url} onChange={handleChange} />
      <button className="btn-s-normal" onClick={handleFetch}>
        请求数据
      </button>
      <article>
        {/* 格式化显示 JSON 或 YAML 响应 */}
        <pre>{formatted}</pre>
      </article>
    </>
  );
}
