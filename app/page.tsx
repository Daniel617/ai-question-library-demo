"use client";

import { useState } from "react";

const prompts = [
  "给初二 3 班出一份一次函数的分层作业，40 分钟完成",
  "找近三年本地中考的几何压轴题，难度适中",
  "根据本周易错点，给我一套 15 题的巩固练习",
];

const questionSets = [
  {
    tone: "本地热题",
    title: "厦门市 2026 初三一模 · 数学精选",
    meta: "18 题 · 45 分钟 · 中等偏上",
    note: "本周 1,284 位老师选用",
    color: "coral",
    symbol: "厦",
  },
  {
    tone: "名校精选",
    title: "双十中学 · 函数与几何融合训练",
    meta: "12 题 · 35 分钟 · 提优",
    note: "命题逻辑清晰，适合拔高",
    color: "violet",
    symbol: "双",
  },
  {
    tone: "持续更新",
    title: "近 7 天新增的本地好题",
    meta: "326 题 · 覆盖 8 个核心考点",
    note: "含 23 道新近考试原题",
    color: "yellow",
    symbol: "新",
  },
];

const classTopics = [
  ["一次函数图象", "84%", "掌握扎实", "good"],
  ["反比例函数应用", "61%", "建议巩固", "warm"],
  ["全等三角形证明", "42%", "重点突破", "alert"],
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [activeNav, setActiveNav] = useState("发现");
  const [saved, setSaved] = useState<string[]>([]);

  const runAi = (value?: string) => {
    const current = value || query;
    if (!current.trim()) {
      setNotice("说说这次想布置什么，我们会优先从本地精品题中为你匹配。");
      return;
    }
    setQuery(current);
    setNotice("AI 正在从 28,426 道本地优质题中组合你的专属题单…");
  };

  const toggleSave = (title: string) => {
    setSaved((items) =>
      items.includes(title) ? items.filter((item) => item !== title) : [...items, title],
    );
  };

  return (
    <main className="app-shell">
      <nav className="topbar">
        <a className="brand" href="#top" aria-label="题库首页">
          <span className="brand-mark">题</span>
          <span>题库</span><i>AI</i>
        </a>
        <div className="nav-links">
          {["发现", "题目", "题单", "我的资源"].map((item) => (
            <button key={item} onClick={() => setActiveNav(item)} className={activeNav === item ? "selected" : ""}>{item}</button>
          ))}
        </div>
        <div className="top-actions">
          <button className="icon-button" aria-label="通知">⌁<b></b></button>
          <button className="avatar" aria-label="我的账户">林</button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span></span> 你的本地 AI 题库</p>
          <h1>好题不必找很久，<br /><em>一句话</em>就能开始。</h1>
          <p className="hero-sub">懂本地、懂教学、也懂你的班级。每一次出题，都从经过真实教学验证的好题开始。</p>
        </div>
        <div className="hero-ornament" aria-hidden="true">
          <div className="orbit orbit-a"></div><div className="orbit orbit-b"></div>
          <div className="floating-card card-one"><small>本地真题</small><strong>1,286</strong><span>本周新增</span></div>
          <div className="floating-card card-two"><span className="spark">✦</span><strong>AI</strong><small>优先匹配现成好题</small></div>
          <div className="floating-card card-three"><span>优质资源</span><b>97.8%</b></div>
        </div>
      </section>

      <section className="ask-panel" aria-label="AI 出题助手">
        <div className="ask-heading"><span className="ai-dot">✦</span><div><b>今天想让 AI 帮你做什么？</b><small>描述教学需求，题目、题单、改编和布置一次完成</small></div></div>
        <div className="prompt-box">
          <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例如：给初二 3 班出一份一次函数的分层作业，40 分钟完成" aria-label="描述教学需求" />
          <button className="submit-prompt" onClick={() => runAi()} aria-label="开始生成">↑</button>
        </div>
        <div className="suggestions"><span>试试这样问</span>{prompts.map((prompt) => <button key={prompt} onClick={() => runAi(prompt)}>{prompt}</button>)}</div>
        {notice && <div className="ai-notice" role="status"><span>✦</span>{notice}</div>}
      </section>

      <section className="discovery-section">
        <div className="section-heading"><div><p className="eyebrow">正在发生</p><h2>本地老师都在用的好题</h2></div><button className="text-link">查看全部 <span>→</span></button></div>
        <div className="resource-grid">
          {questionSets.map((set) => <article className={`resource-card ${set.color}`} key={set.title}>
            <div className="card-visual"><span className="visual-label">{set.tone}</span><div className="visual-letter">{set.symbol}</div><div className="visual-lines"><i></i><i></i><i></i></div></div>
            <div className="resource-content"><div><span className="resource-type">精选题单</span><h3>{set.title}</h3><p>{set.meta}</p></div><div className="resource-bottom"><span className="resource-note">✦ {set.note}</span><button aria-label={`收藏 ${set.title}`} onClick={() => toggleSave(set.title)} className={saved.includes(set.title) ? "saved" : ""}>{saved.includes(set.title) ? "♥" : "♡"}</button></div></div>
          </article>)}
        </div>
      </section>

      <section className="insight-layout">
        <article className="class-insight">
          <div className="section-heading compact"><div><p className="eyebrow">为你的班级</p><h2>初二 3 班 · 本周学习脉搏</h2></div><button className="round-more">•••</button></div>
          <div className="class-summary"><div className="progress-ring"><div><b>76</b><small>学习指数</small></div></div><p>整体状态比上周 <strong>提升 8%</strong><br /><span>AI 发现 1 个值得优先处理的薄弱点</span></p><button>查看班级洞察 →</button></div>
          <div className="topic-list">{classTopics.map(([topic, pct, label, type]) => <div className="topic" key={topic}><div className="topic-name"><b>{topic}</b><span className={type}>{label}</span></div><div className="topic-bar"><i className={type} style={{ width: pct }}></i></div><strong>{pct}</strong></div>)}</div>
        </article>
        <aside className="personal-card">
          <div className="personal-top"><div><p className="eyebrow">你的题库资产</p><h2>越用越懂你的<br />专属题库</h2></div><span className="archive-icon">⌘</span></div>
          <div className="asset-stats"><div><b>2,846</b><span>已沉淀题目</span></div><div><b>62</b><span>优质题单</span></div><div><b>18</b><span>常用标签</span></div></div>
          <p className="personal-note"><span>✦</span> 你的 127 道优质题已被学校老师复用 832 次</p>
          <button>进入我的资源库 <span>→</span></button>
        </aside>
      </section>

      <section className="trust-strip">
        <div><span className="trust-icon">⌁</span><p><b>每一道题，都有自己的成长轨迹</b><small>来自哪里、谁在使用、是否有效，题库帮你持续沉淀。</small></p></div>
        <div className="trust-metrics"><span><b>28,426</b> 本地优质题</span><span><b>1,964</b> 所学校在用</span><span><b>96.7%</b> 老师直接采用</span></div>
      </section>
      <footer>题库 AI · 让每一次教学准备，都成为更好的开始</footer>
    </main>
  );
}
