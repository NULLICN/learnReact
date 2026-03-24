import styles from "../styles/renderList.module.css";

// RenderList 组件：展示一组人物及筛选后的化学家列表。
// 使用 CSS Module `renderList.module.css` 以保证样式仅在本组件生效。
export default function RenderList() {
  // 简单字符串数组，包含姓名与职业的描述（用于展示原始列表）
  const people = [
    "凯瑟琳·约翰逊: 数学家",
    "马里奥·莫利纳: 化学家",
    "穆罕默德·阿卜杜勒·萨拉姆: 物理学家",
    "珀西·莱温·朱利亚: 化学家",
    "苏布拉马尼扬·钱德拉塞卡: 天体物理学家",
  ];

  // 结构化对象数组，包含 id（用于 React key）、name、profession
  const peopleObj = [
    {
      id: 0,
      name: "凯瑟琳·约翰逊",
      profession: "数学家",
    },
    {
      id: 1,
      name: "马里奥·莫利纳",
      profession: "化学家",
    },
    {
      id: 2,
      name: "穆罕默德·阿卜杜勒·萨拉姆",
      profession: "物理学家",
    },
    {
      id: 3,
      name: "珀西·莱温·朱利亚",
      profession: "化学家",
    },
    {
      id: 4,
      name: "苏布拉马尼扬·钱德拉塞卡",
      profession: "天体物理学家",
    },
  ];

  // 把 `people` 映射为一组 <li>，此处使用 index 作为 key（原始展示用，若有稳定 id 应优先使用 id）
  const listItems = people.map((person, index) => (
    <li key={index}>{person}</li>
  ));

  // 从对象数组中筛选出 profession 为“化学家”的项，便于单独渲染
  const chemists = peopleObj.filter((person) => person.profession === "化学家");

  return (
    <>
      {/* 根元素使用模块化类名，样式仅作用于此组件 */}
      <section className={styles.renderList}>
        {/* 原始字符串列表展示 */}
        <div className={styles.renderListRaw}>
          <h2>人物列表</h2>
          <ul>{listItems}</ul>
        </div>

        <hr />

        {/* 筛选后的化学家列表，使用对象 id 作为 key 更稳健 */}
        <div className={styles.renderListChemists}>
          <h2>化学家</h2>
          <ul>
            {chemists.map((chemist) => (
              <li key={chemist.id}>{chemist.name}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
