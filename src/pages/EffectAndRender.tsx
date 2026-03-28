import axios from "axios";
import * as yaml from "js-yaml";
import { useEffect, useRef, useMemo } from "react";
import { useImmer } from "use-immer";
export default function EffectAndRender() {
  const [isShow, setIsShow] = useImmer(false);
  const [inputData, setInputData] = useImmer(1);
  const [data, setData] = useImmer(0);
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
      <section>
        <TimeComponent />
        <MemoizedComponent />
      </section>
      <section>
        <EffectRenderTiming data={data} />
        <input type="text" onChange={(e) => setInputData(Number(e.target.value))}/>
        <button onClick={()=>{setData(inputData)}}>增加数据</button>
      </section>
      <section>
        <p>无响应依赖的Effect</p>
        <NoDepsEffect />
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

interface RequestHeader {
  key: string;
  value: string;
}

function NetworkRequest() {
  // while(1) {}
  const [url, setUrl] = useImmer("");
  const [method, setMethod] = useImmer<"GET" | "POST" | "PUT" | "DELETE">(
    "GET",
  );
  const [headers, setHeaders] = useImmer<RequestHeader[]>([
    { key: "Content-Type", value: "application/json" },
  ]);
  const [payload, setPayload] = useImmer("");
  const [formatted, setFormatted] = useImmer("");
  const [loading, setLoading] = useImmer(false);
  const [error, setError] = useImmer("");
  // localStorage 键值对列表与已选中的键
  const [lsEntries, setLsEntries] = useImmer<{ key: string; value: string }[]>(
    [],
  );
  const [selectedLsKeys, setSelectedLsKeys] = useImmer<string[]>([]);

  /** 刷新 lsEntries，读取当前 localStorage 所有键值对 */
  function refreshLsEntries() {
    const entries: { key: string; value: string }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)!;
      entries.push({ key: k, value: localStorage.getItem(k) ?? "" });
    }
    setLsEntries(entries);
  }

  function handleToggleLsKey(key: string) {
    setSelectedLsKeys((draft) => {
      const idx = draft.indexOf(key);
      if (idx === -1) draft.push(key);
      else draft.splice(idx, 1);
    });
  }

  function handleAddHeader() {
    setHeaders((draft) => {
      draft.push({ key: "", value: "" });
    });
  }

  function handleHeaderChange(
    index: number,
    field: "key" | "value",
    val: string,
  ) {
    setHeaders((draft) => {
      draft[index][field] = val;
    });
  }

  function handleRemoveHeader(index: number) {
    setHeaders((draft) => {
      draft.splice(index, 1);
    });
  }

  async function handleAxios() {
    setLoading(true);
    setError("");
    setFormatted("");
    try {
      // 将 headers 数组转换为对象
      const headersObj = headers.reduce<Record<string, string>>((acc, h) => {
        if (h.key.trim()) acc[h.key.trim()] = h.value;
        return acc;
      }, {});

      // 解析请求载荷
      let data: unknown = undefined;
      if (payload.trim()) {
        try {
          data = JSON.parse(payload);
        } catch {
          data = payload;
        }
      }
      // 将选中的 localStorage 键值对合并进请求头
      if (selectedLsKeys.length > 0) {
        selectedLsKeys.forEach((k) => {
          headersObj[k] = localStorage.getItem(k) ?? "";
        });
      }

      const response = await axios({
        url,
        method,
        headers: headersObj,
        data,
        // 以文本形式接收响应，手动处理类型
        responseType: "text",
        transformResponse: (raw) => raw, // 阻止 axios 自动 JSON 解析
      });

      const contentType: string =
        (response.headers as Record<string, string>)["content-type"] ?? "";
      const rawText: string = response.data as string;

      if (contentType.includes("application/json")) {
        // JSON 响应：解析后格式化缩进输出
        try {
          const parsed = JSON.parse(rawText);
          setFormatted(JSON.stringify(parsed, null, 2));
          // 检查是否存在 tokenValue，存在则写入 localStorage["Authorization"]
          if (
            parsed !== null &&
            typeof parsed === "object" &&
            "tokenValue" in parsed.data
          ) {
            localStorage.setItem(
              "Authorization",
              String(parsed.data.tokenValue),
            );
          }
        } catch {
          setFormatted(rawText);
        }
      } else if (
        contentType.includes("application/yaml") ||
        contentType.includes("text/yaml")
      ) {
        // YAML 响应：转为 JS 对象后再序列化为带缩进的 JSON 展示
        try {
          const parsed = yaml.load(rawText);
          setFormatted(JSON.stringify(parsed, null, 2));
        } catch {
          setFormatted(rawText);
        }
      } else {
        // 其他文本类型直接展示
        setFormatted(rawText);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          `请求失败 [${err.response?.status ?? "网络错误"}]: ${err.message}`,
        );
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        {/* 请求方法 */}
        <select
          value={method}
          onChange={(e) =>
            setMethod(e.target.value as "GET" | "POST" | "PUT" | "DELETE")
          }
        >
          {(["GET", "POST", "PUT", "DELETE"] as const).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        {/* 请求 URL */}
        <input
          type="text"
          style={{ flex: 1 }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="请输入请求 URL"
        />
        <button
          className="btn-s-normal"
          onClick={handleAxios}
          disabled={loading}
        >
          {loading ? "请求中..." : "发送请求"}
        </button>
      </div>

      {/* 请求头设置 */}
      <fieldset style={{ marginBottom: "8px" }}>
        <legend>请求头</legend>
        {headers.map((h, i) => (
          <div
            key={i}
            style={{ display: "flex", gap: "4px", marginBottom: "4px" }}
          >
            <input
              type="text"
              placeholder="字段名"
              value={h.key}
              onChange={(e) => handleHeaderChange(i, "key", e.target.value)}
            />
            <input
              type="text"
              placeholder="字段值"
              value={h.value}
              onChange={(e) => handleHeaderChange(i, "value", e.target.value)}
            />
            <button
              className="btn-s-normal"
              onClick={() => handleRemoveHeader(i)}
            >
              删除
            </button>
          </div>
        ))}
        <button className="btn-s-normal" onClick={handleAddHeader}>
          + 添加请求头
        </button>
      </fieldset>

      {/* 请求载荷（Body） */}
      <fieldset style={{ marginBottom: "8px" }}>
        <legend>请求载荷（JSON / 文本）</legend>
        <textarea
          rows={4}
          style={{ width: "100%", boxSizing: "border-box" }}
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder='例：{"title":"foo","body":"bar"}'
        />
      </fieldset>

      {/* 从 localStorage 注入请求头 */}
      <fieldset style={{ marginBottom: "8px" }}>
        <legend>从 localStorage 注入请求头</legend>
        <div style={{ marginBottom: "4px" }}>
          <button className="btn-s-normal" onClick={refreshLsEntries}>
            刷新 localStorage 列表
          </button>
        </div>
        {lsEntries.length === 0 ? (
          <p style={{ color: "#888", fontSize: "12px" }}>
            暂无数据，请点击刷新
          </p>
        ) : (
          <table
            style={{
              fontSize: "13px",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "2px 6px" }}>选择</th>
                <th style={{ textAlign: "left", padding: "2px 6px" }}>键</th>
                <th style={{ textAlign: "left", padding: "2px 6px" }}>
                  值（预览）
                </th>
              </tr>
            </thead>
            <tbody>
              {lsEntries.map((entry) => (
                <tr key={entry.key}>
                  <td style={{ padding: "2px 6px" }}>
                    <input
                      type="checkbox"
                      checked={selectedLsKeys.includes(entry.key)}
                      onChange={() => handleToggleLsKey(entry.key)}
                    />
                  </td>
                  <td style={{ padding: "2px 6px", fontWeight: "bold" }}>
                    {entry.key}
                  </td>
                  <td
                    style={{
                      padding: "2px 6px",
                      color: "#555",
                      maxWidth: "240px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={entry.value}
                  >
                    {entry.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selectedLsKeys.length > 0 && (
          <p style={{ fontSize: "12px", color: "#0a7", marginTop: "4px" }}>
            已选中：{selectedLsKeys.join(", ")}，将作为请求头字段随请求发送
          </p>
        )}
      </fieldset>

      {/* 响应展示 */}
      <article>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* 格式化显示 JSON 或 YAML 响应 */}
        <pre
          style={{ background: "#f5f5f5", padding: "8px", overflowX: "auto" }}
        >
          {formatted}
        </pre>
      </article>
    </>
  );
}

function MemoizedComponent() {
  function expensiveComputation() {
    // 强行阻塞主线程 1 秒，模拟一个昂贵的计算
    // const start = Date.now();
    // while (Date.now() - start < 1000) {}
    return 100 + extraData;
  }
  const [extraData, setExtraData] = useImmer(0);
  const memoizedValue = useMemo(() => expensiveComputation(), [extraData]);
  return (
    <>
      <p>缓存计算</p>
      <button className="btn-s-normal" onClick={() => setExtraData(extraData + 1)}>
        增加但会阻塞
      </button>
      <button className="btn-s-normal" onClick={() => console.log(memoizedValue)}>
        检查缓存值
      </button>
    </>
  );
}

function TimeComponent() {
  const [time, setTime] = useImmer(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>当前时间：{time.toLocaleTimeString()}</p>;
}

function EffectRenderTiming({ data }: { data: number }) {
  const [compdata, setCompData] = useImmer(0);
  if(data !== compdata) {
    setCompData(data);
  }
  useEffect(() => {
    console.log("组件挂载，副作用执行，当前值：", compdata);
    return ()=>{
      console.log("组件销毁，副作用执行，上一个值",compdata);
    }
  })
  return (
    <>
      <p>data: {compdata}</p>
    </>
  )
}

// 无响应依赖的Effect
function NoDepsEffect() {
  console.log("组件渲染");
  const [count, setCount] = useImmer(0);
  const [increment, setIncrement] = useImmer(0);
  
  function onTick() {
    setCount(()=> count + increment );
  }
  useEffect(() => {
    console.log("副作用执行");
    const timer = setInterval(onTick, 1000);
    return () => {
      clearInterval(timer);
    };
  })
  return(
    <>
      <p>计数: {count}</p>
      <p>增量: {increment}</p>
      <button className="btn-s-normal" onClick={()=>setIncrement(increment+1)}>增加</button>
      <button className="btn-s-normal" onClick={()=>setIncrement(increment-1)}>减少</button>
    </>
  )
}