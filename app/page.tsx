"use client";

import { useState } from "react";

type Nav = "发现" | "题目" | "试卷" | "我的资源";

const questionBank = [
  {
    id: "q1",
    type: "本地真题",
    title: "一次函数图象与坐标轴围成的面积",
    stem: "一次函数 y＝−2x＋4 的图象与 x 轴、y 轴分别交于 A、B 两点，则 △AOB 的面积为（　）",
    options: ["A. 2", "B. 4", "C. 6", "D. 8"],
    answer: "B",
    analysis: "令 y＝0，得 A(2,0)；令 x＝0，得 B(0,4)。因此 S△AOB＝1/2×2×4＝4。",
    source: "2026 厦门市初三一模",
    sourceDetail: "原卷第 8 题 · 厦门双十中学初三年级",
    usage: "近 30 天被采用 184 次",
    updated: "今天 09:20",
    tag: "本地高频",
    difficulty: "中等",
  },
  {
    id: "q2",
    type: "名校精选",
    title: "全等三角形的判定与应用",
    stem: "如图，AB＝AC，∠BAD＝∠CAE。若要证明 △ABD≌△ACE，还需补充的条件可以是（　）",
    options: ["A. BD＝CE", "B. AD＝AE", "C. ∠B＝∠C", "D. ∠ADB＝∠AEC"],
    answer: "B",
    analysis: "由 AB＝AC、∠BAD＝∠CAE，再补充 AD＝AE，可依据 SAS 判定两三角形全等。",
    source: "双十中学 2026 春季期中",
    sourceDetail: "原卷第 12 题 · 八年级数学期中考试",
    usage: "校内 37 位老师采用",
    updated: "今天 08:46",
    tag: "推荐给初二 3 班",
    difficulty: "中等",
  },
  {
    id: "q3",
    type: "AI 精准改编",
    title: "反比例函数的实际应用",
    stem: "某蓄水池排水时，剩余水量 y（m³）与排水时间 x（h）满足 y＝24/x。当剩余水量为 6 m³ 时，已经排水（　）小时。",
    options: ["A. 2", "B. 3", "C. 4", "D. 6"],
    answer: "C",
    analysis: "将 y＝6 代入 y＝24/x，得 6＝24/x，因此 x＝4。该题针对班级‘由函数值反求自变量’易错点改编。",
    source: "基于湖里区统测题改编",
    sourceDetail: "母题：湖里区 2025 初二期末统测第 15 题",
    usage: "针对初二 3 班学情生成",
    updated: "刚刚生成",
    tag: "班级薄弱点",
    difficulty: "基础",
  },
  {
    id: "q4",
    type: "本周新增",
    title: "二次根式的化简与估值",
    stem: "估计 √18＋1 的值应在（　）",
    options: ["A. 4 和 5 之间", "B. 5 和 6 之间", "C. 6 和 7 之间", "D. 7 和 8 之间"],
    answer: "B",
    analysis: "因为 4＜√18＜5，所以 5＜√18＋1＜6。",
    source: "校本资源 · 使用验证 12 次",
    sourceDetail: "厦门一中校本作业 · 二次根式专题",
    usage: "学生作答正确率 72%",
    updated: "昨天 18:12",
    tag: "高采用率",
    difficulty: "基础",
  },
];

const paperBank = [
  {
    id: "p1",
    city: "厦门",
    name: "2026 厦门市初三第一次质量检测 · 数学",
    time: "今天 09:20 入库",
    status: "28 题已拆解 · 答案解析已校验",
    meta: "120 分 · 120 分钟 · 难度 0.68",
  },
  {
    id: "p2",
    city: "双十",
    name: "双十中学 2026 春季期中 · 数学",
    time: "今天 08:46 更新",
    status: "21 题已拆解 · 3 题新增教研点评",
    meta: "100 分 · 90 分钟 · 难度 0.72",
  },
  {
    id: "p3",
    city: "湖里",
    name: "湖里区初二期末统测 · 数学",
    time: "昨天 18:12 入库",
    status: "26 题已拆解 · 覆盖 8 个核心考点",
    meta: "100 分 · 100 分钟 · 难度 0.65",
  },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState<Nav>("发现");
  const [query, setQuery] = useState("");
  const [aiRequest, setAiRequest] = useState("");
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [basket, setBasket] = useState<string[]>(["q1", "q3"]);

  const navigate = (target: Nav) => {
    setActiveNav(target);
    setToast("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const newAgentTask = () => {
    setAiRequest("");
    setQuery("");
    setGenerating(false);
    setActiveNav("发现");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const runAi = (request?: string) => {
    const value = (request || query).trim();
    if (!value) {
      setToast("先用一句话说清班级、知识点和时长，其他交给 AI。");
      return;
    }
    setQuery(value);
    setAiRequest(value);
    setActiveNav("发现");
    setGenerating(true);
    window.setTimeout(() => setGenerating(false), 650);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const toggleSaved = (id: string) => {
    setSaved((items) => {
      const exists = items.includes(id);
      setToast(exists ? "已取消收藏" : "已收藏到我的资源");
      return exists ? items.filter((item) => item !== id) : [...items, id];
    });
  };

  const toggleBasket = (id: string) => {
    setBasket((items) => {
      const exists = items.includes(id);
      setToast(exists ? "已从当前试卷取消" : "已加入当前试卷");
      return exists ? items.filter((item) => item !== id) : [...items, id];
    });
  };

  return (
    <main className="app-shell">
      <nav className="topbar">
        <button className="brand" onClick={() => navigate("发现")} aria-label="回到发现页">
          <span className="brand-mark">题</span><span>题库</span><i>AI</i>
        </button>
        <div className="nav-links">
          {(["发现", "题目", "试卷", "我的资源"] as Nav[]).map((item) => (
            <button key={item} onClick={() => navigate(item)} className={activeNav === item ? "selected" : ""}>{item}</button>
          ))}
        </div>
        <div className="top-actions">
          {basket.length > 0 && <button className="basket" onClick={() => navigate("试卷")}>当前试卷 <b>{basket.length}</b></button>}
          <button className="bell" aria-label="查看更新通知" onClick={() => setToast("今天已新增 46 份本地试卷，最新一份 34 分钟前可用")}>⌁<i></i></button>
          <button className="avatar" aria-label="进入我的资源" onClick={() => navigate("我的资源")}>林</button>
        </div>
      </nav>

      {activeNav === "发现" && <Discovery query={query} setQuery={setQuery} runAi={runAi} aiRequest={aiRequest} generating={generating} notify={setToast} navigate={navigate} newTask={newAgentTask} />}
      {activeNav === "题目" && <Questions saved={saved} basket={basket} toggleSaved={toggleSaved} toggleBasket={toggleBasket} runAi={runAi} notify={setToast} />}
      {activeNav === "试卷" && <Papers saved={saved} toggleSaved={toggleSaved} runAi={runAi} notify={setToast} />}
      {activeNav === "我的资源" && <Resources saved={saved} basket={basket} navigate={navigate} notify={setToast} />}

      {toast && <div className="toast" role="status"><span>✦</span>{toast}<button onClick={() => setToast("")} aria-label="关闭提示">×</button></div>}
    </main>
  );
}

function Discovery({ query, setQuery, runAi, aiRequest, generating, notify, navigate, newTask }: { query: string; setQuery: (value: string) => void; runAi: (value?: string) => void; aiRequest: string; generating: boolean; notify: (message: string) => void; navigate: (target: Nav) => void; newTask: () => void }) {
  const [contexts, setContexts] = useState(["初二 3 班", "北师大版", "近 4 周学情"]);
  const contextPresets = ["基础题优先", "40 分钟", "周四布置", "包含解析"];
  const quick = [
    "给初二 3 班出一次函数分层作业，40 分钟",
    "用本周易错点生成 15 题巩固练习",
    "找近三年本地中考几何压轴题",
  ];

  if (aiRequest && !generating) {
    return <AgentWorkspace request={aiRequest} runAi={runAi} notify={notify} navigate={navigate} newTask={newTask} />;
  }

  return <>
    <section className="ai-hero">
      <div className="hero-copy">
        <span className="product-kicker"><i></i> 懂本地 · 懂班级 · 交付可用结果</span>
        <h1>说需求，<em>拿结果</em>。</h1>
        <p>AI 从本地好题中优先匹配，找题、组卷、改编和布置一步完成。</p>
      </div>
      <div className="proof-card">
        <div><b>8,642</b><span>近 7 天新增题目</span></div>
        <div><b>126</b><span>近 7 天新增试卷</span></div>
        <small><i></i> 最新一份 34 分钟前可用</small>
      </div>
    </section>

    <section className="composer" aria-label="AI 教学需求输入">
      <div className="context-row"><span>已自动带入</span>{contexts.map((item) => <button className="context-chip" key={item} title={`移除${item}`} onClick={() => setContexts(contexts.filter((context) => context !== item))}>{item}<b>×</b></button>)}<button className="add-context" onClick={() => { const next = contextPresets.find((item) => !contexts.includes(item)); if (next) setContexts([...contexts, next]); else notify("常用条件都已添加，也可以直接在输入框里补充"); }}>＋ 添加条件</button></div>
      <div className="composer-input"><span>✦</span><textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例如：一次函数分层作业，40 分钟，基础题多一点" aria-label="输入教学需求" onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runAi(); } }} /><button onClick={() => runAi()}>生成 <b>↑</b></button></div>
      <div className="quick-prompts"><small>不知怎么说？直接点：</small>{quick.map((item) => <button key={item} onClick={() => runAi(item)}>{item}</button>)}</div>
    </section>

    {generating && <section className="generation-state"><span>✦</span><div><b>AI 正在组装最合适的内容</b><p>先匹配本地精品题 → 校验知识点与难度 → 用班级薄弱点补足</p></div><i></i></section>}

    {!aiRequest && <section className="discovery-grid">
      <div className="section-head"><div><span>今天正在发生</span><h2>本地好内容，比你先一步到达</h2></div><button onClick={() => navigate("试卷")}>查看全部试卷 →</button></div>
      <div className="live-cards">
        {paperBank.map((paper, index) => <article key={paper.id}><div className={`mini-cover cover-${index}`}>{paper.city}<small>2026 · 数学试卷</small></div><div><span className="live"><i></i>{paper.time}</span><h3>{paper.name}</h3><p>{paper.status}</p><div className="update-tags"><span>{paper.meta.split(" · ")[0]}</span><span>{index === 0 ? "今日 184 位老师查看" : index === 1 ? "校内采用 37 次" : "覆盖 8 个考点"}</span></div><button onClick={() => navigate("试卷")}>展开试卷内容</button></div></article>)}
        <article><div className="mini-cover cover-3">新题<small>326 道 · 持续入库</small></div><div><span className="live"><i></i>今天累计更新 7 次</span><h3>近 7 天本地高质量新题</h3><p>覆盖函数、几何、数与式等 12 个核心专题，答案解析均已校验</p><div className="update-tags"><span>326 道题</span><span>23 道新近考试原题</span></div><button onClick={() => navigate("题目")}>查看新增题目</button></div></article>
      </div>
    </section>}
    <Footer />
  </>;
}

const teacherRecords = [
  { title: "本周易错点巩固", request: "用本周易错点生成 15 题巩固练习", result: "初二 3 班 · 一次函数分层巩固", time: "今天 10:32", detail: "换题 2 道 · 降低难度 1 次", used: "已布置" },
  { title: "一次函数课后作业", request: "给初二 3 班出一次函数课后作业，30 分钟", result: "一次函数基础过关练习", time: "昨天 16:48", detail: "采用本地题 10 道 · 改编 2 道", used: "已使用" },
  { title: "几何压轴题选练", request: "找近三年本地中考几何压轴题，难度适中", result: "中考几何压轴题精选", time: "周一 09:15", detail: "收藏 8 道 · 组成 1 份试卷", used: "已收藏" },
  { title: "月考错题重练", request: "把月考错题按知识点重新生成一份练习", result: "初二 3 班月考错题重练", time: "上周五", detail: "学生完成率 96% · 平均分 +7", used: "已完成" },
];

function AgentWorkspace({ request, runAi, notify, navigate, newTask }: { request: string; runAi: (value?: string) => void; notify: (message: string) => void; navigate: (target: Nav) => void; newTask: () => void }) {
  const [record, setRecord] = useState(0);
  const [followup, setFollowup] = useState("");
  const [variant, setVariant] = useState(0);
  const [easy, setEasy] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [messages, setMessages] = useState([
    { role: "teacher", text: request },
    { role: "agent", text: "已优先匹配 12 道本地现成好题，并根据班级薄弱点改编 3 道。答案、解析和难度已经校验。" },
  ]);

  const current = record === 0 ? { ...teacherRecords[0], request, result: "初二 3 班 · 一次函数分层巩固" } : teacherRecords[record];

  const askAgain = (preset?: string) => {
    const value = (preset || followup).trim();
    if (!value) { notify("可以继续说：再简单一点、换成本地期中题，或者生成一份新的练习"); return; }
    setMessages([...messages, { role: "teacher", text: value }, { role: "agent", text: value.includes("简单") ? "已降低整体难度，替换 3 道题，并保留相同考点结构。" : value.includes("换") ? "已优先换成双十中学与厦门一中的近期考试题，来源信息已保留。" : "已根据新要求生成一个版本，右侧内容和推荐依据已同步更新。" }]);
    if (value.includes("简单")) setEasy(true);
    setVariant(variant + 1);
    setFollowup("");
    notify("题库 Agent 已完成新一轮调整");
  };

  return <section className="agent-layout">
    <aside className="agent-sidebar">
      <div className="agent-brand"><span>✦</span><div><b>题库 Agent</b><small><i></i> 正在为林老师工作</small></div></div>
      <button className="new-agent-task" onClick={newTask}>＋ 新建任务</button>
      <div className="record-title"><b>林老师的工作记录</b><span>自动沉淀</span></div>
      <div className="record-list">{teacherRecords.map((item, index) => <button key={item.title} className={record === index ? "active" : ""} onClick={() => { setRecord(index); setMessages([{ role: "teacher", text: item.request }, { role: "agent", text: `已打开“${item.result}”，可以继续修改或生成新版本。` }]); }}><div><b>{item.title}</b><span>{item.time}</span></div><p>{item.detail}</p><small>{item.used}</small></button>)}</div>
      <div className="teacher-memory"><span>Agent 记住了</span><div><b>常用班级</b><p>初二 3 班</p></div><div><b>偏好</b><p>基础题优先 · 30–40 分钟 · 含解析</p></div><button onClick={() => notify("已打开林老师的题库偏好，可继续补充")}>管理我的题库记忆 →</button></div>
      <section className="agent-chat">
        <div className="conversation-title"><div><span>✦</span><b>继续完善当前结果</b></div><small>上下文与修改记录自动保留</small></div>
        <div className="messages">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`message ${message.role}`}><span>{message.role === "teacher" ? "林" : "✦"}</span><p>{message.text}</p></div>)}</div>
        <div className="agent-events"><span>Agent 执行记录</span><div><i>✓</i><p>检索 28,426 道本地题目</p><small>0.4 秒</small></div><div><i>✓</i><p>匹配班级易错点与教学进度</p><small>0.8 秒</small></div><div><i>✓</i><p>校验答案、解析与难度结构</p><small>1.2 秒</small></div></div>
        <div className="followup-presets"><button onClick={() => askAgain("再简单一点，基础题增加到 60%")}>再简单一点</button><button onClick={() => askAgain("换成本地学校最近的期中题")}>换成本地期中题</button><button onClick={() => askAgain("保持考点，再生成一份周末练习")}>生成周末练习</button></div>
        <div className="followup-box"><textarea value={followup} onChange={(e) => setFollowup(e.target.value)} placeholder="继续提问，例如：第 6 题太难，换一道……" onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); askAgain(); } }} /><button onClick={() => askAgain()}>发送 ↑</button></div>
      </section>
    </aside>

    <div className="agent-main">
      <header className="agent-header"><div><span>当前任务</span><h1>{current.title}</h1><p>{current.request}</p></div><div><button onClick={() => notify("已保存当前版本到我的资源")}>保存版本</button><button onClick={() => navigate("我的资源")}>查看记录</button><button className="primary" onClick={() => { setAssigned(true); notify("已布置给初二 3 班，学生端将在 18:00 开放"); }}>{assigned ? "已布置 ✓" : "直接布置"}</button></div></header>
      <section className="agent-output">
        <div className="output-head"><div><span>✓ 已完成 · 第 {variant + 1} 版</span><h2>{current.result}</h2><p>15 题 · 40 分钟 · {easy ? "基础为主" : "中等难度"} · 预计平均得分 {easy ? 86 : 82}</p></div><div><button onClick={() => { setEasy(!easy); setVariant(variant + 1); notify(easy ? "已恢复中等难度" : "已降低难度并生成新版本"); }}>{easy ? "恢复难度" : "降低难度"}</button><button onClick={() => { setVariant(variant + 1); notify("已替换第 6 题并生成新版本"); }}>换一道题</button></div></div>
        <div className="output-content"><PaperSheet compact variant={variant} easy={easy} /><aside className="agent-evidence"><h3>这份结果的依据</h3><div><b>12 / 15</b><p>来自本地现成好题<small>近一年采用率 94%</small></p></div><div><b>3</b><p>根据班级薄弱点改编<small>聚焦图象识别与实际应用</small></p></div><div><b>100%</b><p>答案与解析已校验<small>2 道题含教研点评</small></p></div><button onClick={() => navigate("试卷")}>查看完整试卷 →</button></aside></div>
      </section>
    </div>
  </section>;
}

function Questions({ saved, basket, toggleSaved, toggleBasket, runAi, notify }: { saved: string[]; basket: string[]; toggleSaved: (id: string) => void; toggleBasket: (id: string) => void; runAi: (value: string) => void; notify: (message: string) => void }) {
  const [filter, setFilter] = useState("推荐给我");
  const [opened, setOpened] = useState("q1");
  const [showCatalog, setShowCatalog] = useState(false);
  const [chapter, setChapter] = useState("第四章 一次函数");
  const [grade, setGrade] = useState("八年级下");
  const [difficulty, setDifficulty] = useState("全部难度");
  const [sourceFilter, setSourceFilter] = useState("全部来源");
  const filters = ["推荐给我", "本地真题", "名校精选", "本周新增"];
  const chapters = ["第一章 三角形的证明", "第二章 一元一次不等式", "第三章 图形的平移与旋转", "第四章 一次函数", "第五章 二元一次方程组", "第六章 平行四边形"];
  const byCategory = filter === "推荐给我" ? questionBank : questionBank.filter((q) => q.type === filter || (filter === "本周新增" && q.type === "本周新增"));
  const visible = byCategory.filter((q) => (difficulty === "全部难度" || q.difficulty === difficulty) && (sourceFilter === "全部来源" || q.type === sourceFilter));

  return <section className="content-page">
    <header className="page-header"><div><span className="page-kicker">每道题都可验证、可追溯、可改编</span><h1>题目</h1><p>先看内容与依据，再决定是否使用。</p></div><button className="primary-button" onClick={() => runAi("从本地题库找适合初二 3 班的一次函数巩固题")}>✦ 让 AI 替我找</button></header>
    <div className="resource-finder"><button className={showCatalog ? "active" : ""} onClick={() => setShowCatalog(!showCatalog)}>☰ 教材目录</button><button onClick={() => setGrade(grade === "八年级下" ? "九年级上" : "八年级下")}>{grade}⌄</button><button className="wide" onClick={() => setShowCatalog(!showCatalog)}>{chapter}⌄</button><button onClick={() => setDifficulty(difficulty === "全部难度" ? "基础" : difficulty === "基础" ? "中等" : "全部难度")}>{difficulty}⌄</button><button onClick={() => setSourceFilter(sourceFilter === "全部来源" ? "本地真题" : sourceFilter === "本地真题" ? "名校精选" : "全部来源")}>{sourceFilter}⌄</button><button className="reset" onClick={() => { setGrade("八年级下"); setChapter("第四章 一次函数"); setDifficulty("全部难度"); setSourceFilter("全部来源"); setFilter("推荐给我"); }}>重置</button></div>
    {showCatalog && <div className="catalog-panel"><div><b>北师大版 · {grade}</b><span>选择教材章节，右侧题目会立即更新</span></div><div>{chapters.map((item) => <button key={item} className={chapter === item ? "active" : ""} onClick={() => { setChapter(item); setShowCatalog(false); notify(`已切换到${item}`); }}>{item}<small>{item.includes("一次函数") ? "326 题" : item.includes("三角形") ? "248 题" : "180+ 题"}</small></button>)}</div></div>}
    <div className="filter-bar">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}<span>共 {visible.length} 道示例 · 最近更新优先</span></div>
    <div className="question-layout">
      <div className="question-cards">{visible.length === 0 && <div className="empty-result"><span>暂时没有同时满足这些条件的题目</span><p>可以放宽难度或来源，也可以让 AI 按当前条件生成。</p><button onClick={() => { setDifficulty("全部难度"); setSourceFilter("全部来源"); setFilter("推荐给我"); }}>清除筛选</button></div>}{visible.map((q) => <article className={opened === q.id ? "open" : ""} key={q.id}>
        <button className="question-main" onClick={() => setOpened(opened === q.id ? "" : q.id)}>
          <div className="q-top"><span>{q.type}</span><i>{q.difficulty}</i><small>{q.updated}</small></div><h3>{q.stem}</h3><div className="options-row">{q.options.map((option) => <span key={option}>{option}</span>)}</div><div className="source-row"><span>来源</span><div><b>{q.source}</b><small>{q.sourceDetail} · {q.usage}</small></div><i>{q.tag}</i></div>
        </button>
        {opened === q.id && <div className="answer-panel"><span>答案 {q.answer}</span><p>{q.analysis}</p></div>}
        <div className="q-actions"><button className="adapt" onClick={() => runAi(`把“${q.title}”改编成适合初二 3 班的题目，考点不变，情境更新`)}>✦ AI 改编</button><button onClick={() => setOpened(opened === q.id ? "" : q.id)}>{opened === q.id ? "收起解析" : "查看解析"}</button><button onClick={() => { notify("已找到 3 道同考点、不同情境的题目"); setOpened(q.id); }}>找相似题</button><button onClick={() => toggleSaved(q.id)}>{saved.includes(q.id) ? "已收藏 ✓" : "收藏"}</button><button className="add" onClick={() => toggleBasket(q.id)}>{basket.includes(q.id) ? "已加入试卷 ✓" : "加入试卷 +"}</button></div>
      </article>)}</div>
      <aside className="question-ai"><span>✦ AI 选题观察</span><h3>这组题为什么适合你</h3><p>初二 3 班最近在“一次函数图象识别”上的错误率为 38%，高于同年级 11 个百分点。</p><div><b>建议</b><span>先用 q1 检查概念，再用 q3 迁移到实际情境。</span></div><button onClick={() => runAi("用这组题生成一份 20 分钟的随堂练习")}>用这组题生成练习 →</button></aside>
    </div><Footer />
  </section>;
}

function Papers({ saved, toggleSaved, runAi, notify }: { saved: string[]; toggleSaved: (id: string) => void; runAi: (value: string) => void; notify: (message: string) => void }) {
  const [selected, setSelected] = useState(0);
  const [copyMade, setCopyMade] = useState(false);
  const paper = paperBank[selected];
  return <section className="content-page">
    <header className="page-header"><div><span className="page-kicker">新试卷最快当天完成入库、拆题与校验</span><h1>试卷</h1><p>不是一张封面：内容、结构、来源和解析都能直接检查。</p></div><div className="update-metric"><b>126</b><span>本周新增</span><small>较上周 +32%</small></div></header>
    <div className="paper-workspace">
      <aside className="paper-list"><div className="paper-list-head"><b>最新试卷</b><span><i></i> 34 分钟前更新</span></div>{paperBank.map((item, index) => <button key={item.id} className={selected === index ? "active" : ""} onClick={() => { setSelected(index); setCopyMade(false); }}><span className={`paper-thumb thumb-${index}`}>{item.city}</span><div><b>{item.name}</b><small>{item.time}</small><p>{item.status}</p></div></button>)}</aside>
      <div className="paper-detail-view">
        <div className="paper-toolbar"><div><span>已完成质量校验</span><b>{paper.name}</b><small>{paper.meta}</small></div><div><button onClick={() => toggleSaved(paper.id)}>{saved.includes(paper.id) ? "已收藏 ✓" : "收藏"}</button><button onClick={() => notify("已打开打印预览：A4 双面，含答题区")}>打印预览</button><button onClick={() => runAi(`按初二 3 班学情改编《${paper.name}》`)}>✦ AI 改编</button><button className="primary" onClick={() => { setCopyMade(true); notify("已创建可编辑副本，可自由增删和换题"); }}>{copyMade ? "已创建副本 ✓" : "创建可编辑副本"}</button></div></div>
        <PaperSheet title={paper.name} />
      </div>
    </div><Footer />
  </section>;
}

function PaperSheet({ compact = false, title = "初二 3 班 · 一次函数分层巩固", variant = 0, easy = false }: { compact?: boolean; title?: string; variant?: number; easy?: boolean }) {
  return <div className={`paper-sheet ${compact ? "compact" : ""}`}>
    <div className="sheet-title"><span>题库 AI 智能组卷</span><h2>{title}</h2><p>满分：100 分　考试时间：{compact ? "40" : "120"} 分钟　姓名：__________　班级：__________</p></div>
    <section><h3>一、选择题（每题 3 分，共 30 分）</h3>
      <div className="sheet-question"><b>1.</b><p>一次函数 y＝−2x＋4 的图象与 x 轴、y 轴分别交于 A、B 两点，则 △AOB 的面积为（　）<span>A. 2　　B. 4　　C. 6　　D. 8</span></p><i>本地真题</i></div>
      <div className="sheet-question"><b>2.</b><p>{variant % 2 === 0 ? "若一次函数 y＝kx＋3 的图象经过点 (2,7)，则 k 的值为（　）" : "若直线 y＝kx−1 经过点 (3,5)，则 k 的值为（　）"}<span>A. 1　　B. 2　　C. 3　　D. 4</span></p><i>{easy ? "基础题" : "高频考点"}</i></div>
      <div className="sheet-question"><b>3.</b><p>点 P(a,b) 在函数 y＝−3x＋2 的图象上，则 3a＋b 的值为（　）<span>A. −2　　B. 0　　C. 2　　D. 4</span></p><i>名校精选</i></div>
    </section>
    <section><h3>二、填空题（每题 4 分，共 24 分）</h3><div className="sheet-question"><b>11.</b><p>将直线 y＝2x−1 向上平移 3 个单位后，所得直线的表达式为 ________。</p><i>基础巩固</i></div><div className="sheet-question"><b>12.</b><p>已知一次函数图象经过点 A(−1,2) 和 B(3,−6)，则该函数的表达式为 ________。</p><i>班级易错</i></div></section>
    {!compact && <section><h3>三、解答题（共 46 分）</h3><div className="sheet-question long"><b>17.</b><p>某校计划组织学生前往科技馆，甲、乙两家客运公司给出的包车费用 y（元）与人数 x（人）的关系如下图所示。<br/>（1）分别求两家公司的费用 y 与人数 x 的函数关系式；<br/>（2）当人数为 45 人时，选择哪家公司更合算？请说明理由。</p><i>实际应用</i></div></section>}
    <footer><span>题目来源可追溯 · 答案解析已校验</span><b>第 1 页 / 共 {compact ? 2 : 6} 页</b></footer>
  </div>;
}

function Resources({ saved, basket, navigate, notify }: { saved: string[]; basket: string[]; navigate: (target: Nav) => void; notify: (message: string) => void }) {
  const [tab, setTab] = useState("最近使用");
  const tabs = ["最近使用", "我的收藏", "我的试卷"];
  return <section className="content-page">
    <header className="page-header"><div><span className="page-kicker">每次使用，都在形成更懂你的题库</span><h1>我的资源</h1><p>用过、改过、验证过的内容，在这里持续沉淀。</p></div></header>
    <div className="asset-cards"><article><span>已沉淀题目</span><b>2,846</b><small>本周新增 18 道</small></article><article><span>已验证优质题</span><b>127</b><small>被校内复用 832 次</small></article><article><span>当前试卷</span><b>{basket.length}</b><small>道题等待完成组卷</small></article></div>
    <div className="resource-tabs">{tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}{item === "我的收藏" && ` ${saved.length}`}</button>)}</div>
    <div className="resource-content-card"><div><span>✦ AI 本周建议</span><h3>{tab === "我的试卷" ? "把当前选题补成一份完整试卷" : "函数专题需要再补一次迁移练习"}</h3><p>{tab === "我的收藏" ? `你已收藏 ${saved.length} 份资源，AI 可以按本周进度重新排序。` : "结合教学进度和最近作答，建议周四安排 20 分钟随堂练习。"}</p></div><button onClick={() => { if (tab === "我的试卷") navigate("试卷"); else { navigate("发现"); notify("已带入班级和进度，告诉 AI 题量即可"); } }}>{tab === "我的试卷" ? "继续组卷 →" : "让 AI 准备 →"}</button></div>
    <Footer />
  </section>;
}

function Footer() { return <footer className="site-footer">题库 AI · 好题有来源，推荐有依据，结果可直接使用</footer>; }
