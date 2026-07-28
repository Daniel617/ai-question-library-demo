"use client";

import { useState } from "react";

const prompts = [
  "给初二 3 班出一份一次函数的分层作业，40 分钟完成",
  "把本周易错点做成 15 题巩固练习",
  "找本地近三年几何压轴题，难度适中",
];

const latest = [
  ["厦门市 2026 初三一模 · 数学", "今天 09:20 入库", "18 题 · 中等偏上", "厦"],
  ["双十中学 · 函数与几何融合训练", "今天 08:46 更新", "12 题 · 提优", "双"],
];

const questions = [
  ["一次函数图象与性质", "中考真题", "今天", "本地高频"],
  ["全等三角形证明", "名校期中", "今天", "推荐给初二 3 班"],
  ["反比例函数应用", "AI 纠错补充", "昨天", "班级薄弱点"],
  ["二次根式混合运算", "校本资源", "昨天", "12 位老师复用"],
];

const papers = [
  ["2026 厦门市初三第一次质量检测 · 数学", "今日 09:20", "近 3 年本地试卷自动补全 · 已拆 28 题"],
  ["双十中学 2026 春季期中 · 数学", "今日 08:46", "刚完成解析校验 · 已拆 21 题"],
  ["湖里区初二期末统测 · 数学", "昨天 18:12", "同步新增 16 题，覆盖 6 个考点"],
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [activeNav, setActiveNav] = useState("发现");
  const [saved, setSaved] = useState<string[]>([]);

  const runAi = (value?: string) => {
    const current = value || query;
    if (!current.trim()) return setNotice("说说你的教学需求，AI 会优先匹配现成好题，再补足缺失内容。");
    setQuery(current);
    setNotice("AI 正在检索本地真题、名校资源与班级数据，预计 18 秒交付可用结果…");
  };

  const save = (name: string) => setSaved((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);

  return <main className="app-shell">
    <nav className="topbar">
      <button className="brand" onClick={() => setActiveNav("发现")} aria-label="题库首页"><span className="brand-mark">题</span><span>题库</span><i>AI</i></button>
      <div className="nav-links">{["发现", "题目", "试卷", "我的资源"].map((item) => <button key={item} onClick={() => setActiveNav(item)} className={activeNav === item ? "selected" : ""}>{item}</button>)}</div>
      <div className="top-actions"><button className="icon-button" aria-label="通知">⌁<b></b></button><button className="avatar" aria-label="我的账户">林</button></div>
    </nav>

    {activeNav === "发现" && <Discovery query={query} setQuery={setQuery} runAi={runAi} notice={notice} saved={saved} save={save} />}
    {activeNav === "题目" && <Questions runAi={runAi} />}
    {activeNav === "试卷" && <Papers save={save} saved={saved} />}
    {activeNav === "我的资源" && <Resources />}
  </main>;
}

function Discovery({ query, setQuery, runAi, notice, saved, save }: { query: string; setQuery: (value: string) => void; runAi: (value?: string) => void; notice: string; saved: string[]; save: (name: string) => void }) {
  return <>
    <section className="hero compact-hero">
      <div className="hero-copy"><p className="eyebrow"><span></span> 你的本地 AI 题库</p><h1>说清需求，<em>好题和试卷</em><br />马上交到你手上。</h1><p className="hero-sub">AI 优先复用本地精品资源，结合班级学情完成找题、组卷、改编与布置。</p></div>
      <div className="hero-ornament" aria-hidden="true"><div className="orbit orbit-a"></div><div className="floating-card card-one"><small>本周新增真题</small><strong>1,286</strong><span>持续自动入库</span></div><div className="floating-card card-two"><span className="spark">✦</span><strong>AI</strong><small>先找好题，再生成</small></div></div>
    </section>
    <section className="ask-panel" aria-label="AI 出题助手">
      <div className="ask-heading"><span className="ai-dot">✦</span><div><b>今天想让 AI 帮你做什么？</b><small>一句话说需求，直接交付可用的题目或试卷</small></div></div>
      <div className="prompt-box"><textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例如：给初二 3 班出一份一次函数的分层作业，40 分钟完成" aria-label="描述教学需求" /><button className="submit-prompt" onClick={() => runAi()} aria-label="开始生成">↑</button></div>
      <div className="suggestions"><span>试试这样问</span>{prompts.map((prompt) => <button key={prompt} onClick={() => runAi(prompt)}>{prompt}</button>)}</div>
      {notice && <div className="ai-notice" role="status"><span>✦</span>{notice}</div>}
    </section>
    <section className="discovery-section latest-section">
      <div className="section-heading"><div><p className="eyebrow">资源正在持续变好</p><h2>今天新入库的本地好内容</h2></div><div className="live-update"><i></i> 34 分钟内更新 46 份资源</div></div>
      <div className="latest-grid">{latest.map(([title, time, meta, mark], index) => <article className={`latest-card tone-${index}`} key={title}><div className="latest-mark">{mark}</div><div className="latest-main"><span className="fresh-badge">● {time}</span><h3>{title}</h3><p>{meta}</p></div><button aria-label={`收藏 ${title}`} onClick={() => save(title)} className={saved.includes(title) ? "saved" : ""}>{saved.includes(title) ? "♥" : "♡"}</button></article>)}</div>
    </section>
    <section className="ai-ways"><p className="eyebrow">不止搜索，更直接交付</p><div><article><span>01</span><b>智能找题</b><small>优先匹配本地高质量现成题</small></article><article><span>02</span><b>一键成卷</b><small>按时间、难度、学情自动组卷</small></article><article><span>03</span><b>按需改编</b><small>一句话调整题目与答案解析</small></article></div></section>
    <Footer />
  </>;
}

function Questions({ runAi }: { runAi: (value: string) => void }) {
  return <section className="content-page"><div className="page-heading"><div><p className="eyebrow">28,426 道正在生长的本地好题</p><h1>题目</h1><p>不止能搜，更能让 AI 根据你的教学目标直接找准。</p></div><button className="primary-button" onClick={() => runAi("从本地题库中找适合初二 3 班的函数巩固题")}>✦ 让 AI 找题</button></div><div className="filter-row"><button className="filter-active">推荐给我</button><button>本地真题</button><button>名校精选</button><button>本周新增 1,286</button><span>按最近更新排序</span></div><div className="question-list">{questions.map(([title, source, time, tag]) => <article key={title}><span className="q-number">{String(questions.indexOf(questions.find(x => x[0] === title)!) + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{source} · <b>{time} 更新</b></p></div><span className="q-tag">{tag}</span><button>加入试卷 +</button></article>)}</div><Footer /></section>;
}

function Papers({ save, saved }: { save: (name: string) => void; saved: string[] }) {
  return <section className="content-page papers-page"><div className="page-heading"><div><p className="eyebrow">本地试卷持续入库与拆题</p><h1>试卷</h1><p>最新本地考试资源自动入库、校验、拆题，最快当天即可使用。</p></div><div className="paper-speed"><b>126</b><span>本周新增试卷</span><small>较上周 +32%</small></div></div><div className="update-ribbon"><span>✦</span><b>最新一份试卷 34 分钟前已可用</b><p>AI 正在持续追踪本地考试动态，将新资源转为可检索、可组卷的题目。</p></div><div className="paper-grid">{papers.map(([title, time, detail], index) => <article key={title}><div className={`paper-cover paper-${index}`}><span>数学</span><b>{index === 0 ? "厦门" : index === 1 ? "双十" : "湖里"}</b><i>2026</i></div><div className="paper-detail"><span className="fresh-badge">● {time} 入库</span><h3>{title}</h3><p>{detail}</p><div><button onClick={() => save(title)} className={saved.includes(title) ? "saved" : ""}>{saved.includes(title) ? "已收藏" : "收藏试卷"}</button><button className="open-paper">查看并组卷 →</button></div></div></article>)}</div><Footer /></section>;
}

function Resources() { return <section className="content-page"><div className="page-heading"><div><p className="eyebrow">你的教学资产会持续沉淀</p><h1>我的资源</h1><p>选过、改过、用过的好题，都在变成更懂你的专属题库。</p></div></div><div className="asset-overview"><article><b>2,846</b><span>已沉淀题目</span><small>本周新增 18 道</small></article><article><b>62</b><span>常用试卷</span><small>7 份正在被复用</small></article><article><b>127</b><span>已验证优质题</span><small>被学校老师复用 832 次</small></article></div><div className="resource-note"><span>✦</span><div><b>你的题库正在变得更懂你</b><p>AI 已根据你的教材、进度与常用难度，为本周备课准备了 3 份推荐资源。</p></div><button>查看推荐 →</button></div><Footer /></section> }

function Footer() { return <footer>题库 AI · 让每一次教学准备，都成为更好的开始</footer>; }
