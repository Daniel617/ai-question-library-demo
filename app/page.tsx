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

      {activeNav === "发现" && <Discovery query={query} setQuery={setQuery} runAi={runAi} aiRequest={aiRequest} generating={generating} notify={setToast} navigate={navigate} />}
      {activeNav === "题目" && <Questions saved={saved} basket={basket} toggleSaved={toggleSaved} toggleBasket={toggleBasket} runAi={runAi} notify={setToast} />}
      {activeNav === "试卷" && <Papers saved={saved} toggleSaved={toggleSaved} runAi={runAi} notify={setToast} />}
      {activeNav === "我的资源" && <Resources saved={saved} basket={basket} navigate={navigate} notify={setToast} />}

      {toast && <div className="toast" role="status"><span>✦</span>{toast}<button onClick={() => setToast("")} aria-label="关闭提示">×</button></div>}
    </main>
  );
}

function Discovery({ query, setQuery, runAi, aiRequest, generating, notify, navigate }: { query: string; setQuery: (value: string) => void; runAi: (value?: string) => void; aiRequest: string; generating: boolean; notify: (message: string) => void; navigate: (target: Nav) => void }) {
  const [variant, setVariant] = useState(0);
  const [easy, setEasy] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [contexts, setContexts] = useState(["初二 3 班", "北师大版", "近 4 周学情"]);
  const contextPresets = ["基础题优先", "40 分钟", "周四布置", "包含解析"];
  const quick = [
    "给初二 3 班出一次函数分层作业，40 分钟",
    "用本周易错点生成 15 题巩固练习",
    "找近三年本地中考几何压轴题",
  ];

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

    {aiRequest && !generating && <section className="delivery-workbench">
      <div className="delivery-head"><div><span className="success-pill">✓ 已完成 · 可直接使用</span><h2>初二 3 班 · 一次函数分层巩固</h2><p>15 题 · 40 分钟 · {easy ? "基础为主" : "中等难度"} · 预计平均得分 82</p></div><div className="delivery-actions"><button onClick={() => { setEasy(!easy); notify(easy ? "已恢复中等难度" : "已降低整体难度，替换 3 道题"); }}>{easy ? "恢复难度" : "降低难度"}</button><button onClick={() => { setVariant(variant + 1); notify("已替换第 6 题，结构和考点保持不变"); }}>换一道题</button><button className="primary" onClick={() => { setAssigned(true); notify("已布置给初二 3 班，学生端将在 18:00 开放"); }}>{assigned ? "已布置 ✓" : "直接布置"}</button></div></div>
      <div className="delivery-body">
        <PaperSheet compact variant={variant} easy={easy} />
        <aside className="trust-panel">
          <h3>为什么推荐这份</h3>
          <div className="trust-item"><b>12 / 15</b><p>来自本地现成好题<small>近一年平均采用率 94%</small></p></div>
          <div className="trust-item"><b>3</b><p>根据班级薄弱点改编<small>聚焦图象识别与实际应用</small></p></div>
          <div className="trust-item"><b>100%</b><p>答案与解析已校验<small>2 道题含教研员点评</small></p></div>
          <div className="level-map"><span>基础 40%</span><span>中等 47%</span><span>挑战 13%</span><i><b></b><b></b><b></b></i></div>
          <button onClick={() => navigate("试卷")}>查看完整试卷内容 →</button>
        </aside>
      </div>
    </section>}

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

function Questions({ saved, basket, toggleSaved, toggleBasket, runAi, notify }: { saved: string[]; basket: string[]; toggleSaved: (id: string) => void; toggleBasket: (id: string) => void; runAi: (value: string) => void; notify: (message: string) => void }) {
  const [filter, setFilter] = useState("推荐给我");
  const [opened, setOpened] = useState("q1");
  const filters = ["推荐给我", "本地真题", "名校精选", "本周新增"];
  const visible = filter === "推荐给我" ? questionBank : questionBank.filter((q) => q.type === filter || (filter === "本周新增" && q.type === "本周新增"));

  return <section className="content-page">
    <header className="page-header"><div><span className="page-kicker">每道题都可验证、可追溯、可改编</span><h1>题目</h1><p>先看内容与依据，再决定是否使用。</p></div><button className="primary-button" onClick={() => runAi("从本地题库找适合初二 3 班的一次函数巩固题")}>✦ 让 AI 替我找</button></header>
    <div className="filter-bar">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}<span>共 {visible.length} 道示例 · 最近更新优先</span></div>
    <div className="question-layout">
      <div className="question-cards">{visible.map((q) => <article className={opened === q.id ? "open" : ""} key={q.id}>
        <button className="question-main" onClick={() => setOpened(opened === q.id ? "" : q.id)}>
          <div className="q-top"><span>{q.type}</span><i>{q.difficulty}</i><small>{q.updated}</small></div><h3>{q.stem}</h3><div className="options-row">{q.options.map((option) => <span key={option}>{option}</span>)}</div><p>{q.source} · <b>{q.tag}</b></p>
        </button>
        {opened === q.id && <div className="answer-panel"><span>答案 {q.answer}</span><p>{q.analysis}</p></div>}
        <div className="q-actions"><button onClick={() => setOpened(opened === q.id ? "" : q.id)}>{opened === q.id ? "收起解析" : "查看解析"}</button><button onClick={() => { notify("已找到 3 道同考点、不同情境的题目"); setOpened(q.id); }}>找相似题</button><button onClick={() => toggleSaved(q.id)}>{saved.includes(q.id) ? "已收藏 ✓" : "收藏"}</button><button className="add" onClick={() => toggleBasket(q.id)}>{basket.includes(q.id) ? "已加入试卷 ✓" : "加入试卷 +"}</button></div>
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
