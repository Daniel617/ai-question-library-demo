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
    score: 100,
    duration: 120,
    difficulty: "0.68",
  },
  {
    id: "p2",
    city: "双十",
    name: "双十中学 2026 春季期中 · 数学",
    time: "今天 08:46 更新",
    status: "21 题已拆解 · 3 题新增教研点评",
    score: 100,
    duration: 90,
    difficulty: "0.72",
  },
  {
    id: "p3",
    city: "湖里",
    name: "湖里区初二期末统测 · 数学",
    time: "昨天 18:12 入库",
    status: "26 题已拆解 · 覆盖 8 个核心考点",
    score: 100,
    duration: 100,
    difficulty: "0.65",
  },
];

const paperContents = {
  p1: {
    section: "一、选择题（每题 3 分，共 30 分）",
    questions: [
      { no: "1.", text: "若 x²−5x＋6＝0，则 x 的值为（　）", options: "A. 2　B. 3　C. 2 或 3　D. −2 或 −3", tag: "市质检原题" },
      { no: "2.", text: "如图，在 △ABC 中，DE∥BC，AD∶DB＝2∶1，则 △ADE 与 △ABC 的面积比为（　）", options: "A. 2∶3　B. 4∶9　C. 1∶3　D. 2∶9", tag: "几何高频" },
      { no: "3.", text: "抛物线 y＝x²−4x＋3 的顶点坐标是（　）", options: "A. (2,−1)　B. (−2,−1)　C. (2,1)　D. (−2,1)", tag: "核心考点" },
    ],
    fill: [
      { no: "11.", text: "分解因式：x²−9＝________。", tag: "基础必会" },
      { no: "12.", text: "圆锥底面半径为 3，母线长为 5，则其侧面积为________。", tag: "本地易错" },
    ],
    long: "某校开展科技节义卖活动，甲、乙两个班的销售额 y（元）与时间 x（小时）的函数图象如图所示。（1）求两班销售额对应的函数关系式；（2）说明第几小时后甲班销售额超过乙班。",
  },
  p2: {
    section: "一、选择题（每题 3 分，共 30 分）",
    questions: [
      { no: "1.", text: "下列图形中，是轴对称图形但不是中心对称图形的是（　）", options: "A. 平行四边形　B. 等边三角形　C. 圆　D. 矩形", tag: "双十原题" },
      { no: "2.", text: "若等腰三角形的两边长分别为 4 和 9，则它的周长为（　）", options: "A. 17　B. 22　C. 17 或 22　D. 13", tag: "校内高频" },
      { no: "3.", text: "如图，AB＝AC，AD 平分 ∠BAC。证明 △ABD≌△ACD 的依据是（　）", options: "A. SSS　B. SAS　C. ASA　D. AAS", tag: "教研点评" },
    ],
    fill: [
      { no: "11.", text: "点 P(2,−3) 关于 y 轴对称的点坐标为________。", tag: "基础巩固" },
      { no: "12.", text: "若一个多边形的内角和为 900°，则它的边数是________。", tag: "期中必会" },
    ],
    long: "在 △ABC 中，AB＝AC，D 为 BC 中点，点 E、F 分别在 AB、AC 上，且 BE＝CF。证明：（1）△BDE≌△CDF；（2）DE＝DF。",
  },
  p3: {
    section: "一、选择题（每题 3 分，共 30 分）",
    questions: [
      { no: "1.", text: "一次函数 y＝−2x＋4 的图象与 x 轴、y 轴分别交于 A、B 两点，则 △AOB 的面积为（　）", options: "A. 2　B. 4　C. 6　D. 8", tag: "湖里统测" },
      { no: "2.", text: "若一次函数 y＝kx＋3 的图象经过点 (2,7)，则 k 的值为（　）", options: "A. 1　B. 2　C. 3　D. 4", tag: "基础题" },
      { no: "3.", text: "点 P(a,b) 在函数 y＝−3x＋2 的图象上，则 3a＋b 的值为（　）", options: "A. −2　B. 0　C. 2　D. 4", tag: "区统测高频" },
    ],
    fill: [
      { no: "11.", text: "将直线 y＝2x−1 向上平移 3 个单位后，所得直线的表达式为________。", tag: "基础巩固" },
      { no: "12.", text: "已知一次函数图象经过点 A(−1,2) 和 B(3,−6)，则表达式为________。", tag: "班级易错" },
    ],
    long: "某校组织研学活动，甲、乙两家客运公司的包车费用 y（元）与人数 x（人）满足不同的一次函数关系。（1）分别求函数关系式；（2）当人数为 45 人时，选择哪家公司更合算？",
  },
};

function taskTitleFromRequest(request: string) {
  if (request.includes("一次函数") && request.includes("分层")) return "一次函数分层练习";
  if (request.includes("一次函数")) return "一次函数练习";
  if (request.includes("几何")) return "几何专题选练";
  if (request.includes("错题") || request.includes("易错")) return "班级易错点巩固";
  return "新建教学练习";
}

function resourceTagClass(type: string) {
  if (type.includes("真题")) return "tag-real";
  if (type.includes("名校")) return "tag-school";
  if (type.includes("校本")) return "tag-campus";
  if (type.includes("模拟")) return "tag-mock";
  if (type.includes("专题")) return "tag-topic";
  if (type.includes("培优")) return "tag-advanced";
  if (type.includes("同步")) return "tag-sync";
  if (type.includes("易错") || type.includes("验证")) return "tag-mistake";
  if (type.includes("情境")) return "tag-context";
  if (type.includes("课堂") || type.includes("教研") || type.includes("共创")) return "tag-teaching";
  return "tag-general";
}

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
          <span className="brand-mark">题</span><span>题库 Agent</span>
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
  const [contexts, setContexts] = useState(["七年级", "人教版", "南山区资源优先"]);
  const [resourceTab, setResourceTab] = useState<"区域题库" | "校本题库">("区域题库");
  const [district, setDistrict] = useState<"朝阳" | "深圳" | "平谷">("深圳");
  const [browseTab, setBrowseTab] = useState("全部题单");
  const [selectedUnit, setSelectedUnit] = useState(1);
  const contextPresets = ["基础题优先", "15 分钟", "易错题", "包含解析"];
  const quick = [
    "帮我组一份七年级有理数随堂练习，15 分钟，基础为主",
    "用本周易错点生成 10 题巩固练习",
    "找本地期中考试中高频的几何题",
  ];
  const browseTabs = ["全部题单", "本地最新", "教材章节", "教辅来源", "试卷来源", "本校题单"];
  const textbookUnits = [
    { title: "正数与负数", count: "36 份题单", rows: [["正数与负数概念巩固题单", "16 题 · 20 分钟", "762 人使用"], ["负数符号判断补偿练", "10 题 · 15 分钟", "613 人使用"]] },
    { title: "有理数及其运算", count: "82 份题单", rows: [["有理数运算基础强化题单", "20 题 · 25 分钟", "1,143 人使用"], ["有理数易错专项巩固", "14 题 · 20 分钟", "908 人使用"], ["绝对值与相反数课时练", "16 题 · 20 分钟", "762 人使用"]] },
    { title: "整式的加减", count: "64 份题单", rows: [["整式的加减基础题单", "18 题 · 20 分钟", "908 人使用"], ["同类项与化简分层练", "15 题 · 20 分钟", "669 人使用"]] },
    { title: "一元一次方程", count: "71 份题单", rows: [["一元一次方程应用题单", "22 题 · 25 分钟", "1,221 人使用"], ["移项与去括号易错练", "16 题 · 20 分钟", "742 人使用"]] },
    { title: "图形初步认识", count: "48 份题单", rows: [["图形初步认识巩固题单", "14 题 · 15 分钟", "669 人使用"], ["直线、射线和线段课堂练", "12 题 · 15 分钟", "524 人使用"]] },
  ];
  const currentUnit = textbookUnits[selectedUnit];
  const recommendationSets = {
    朝阳: [
      { eyebrow: "镇库资源 · 强区真题", title: "东西海朝期末真题圈", badge: "2026 最新", copy: "东城、海淀、西城期末卷集中呈现；北京核心区的命题方向、考点组合和难度一眼可见。", items: [["真题", "2026 北京海淀初一（下）期末数学", "强区标尺 · 原卷与解析"], ["真题", "2026 北京西城初一（下）期末数学", "强区标尺 · 考点拆解"], ["真题", "2026 北京东城初一（下）期末数学", "本地热点 · 同步复习"], ["真题", "2026 北京朝阳初一（下）期末数学", "朝阳本地 · 课堂可用"], ["真题", "2026 北京海淀初一（下）期中数学", "强区诊断 · 新入库"], ["真题", "2026 北京西城初一（下）期中数学", "阶段检测 · 热门"]] },
      { eyebrow: "镇库资源 · 名校校本", title: "人大附、北京四中校本精选", badge: "培优与命题参考", copy: "头部学校校本练习与模拟卷，提供清晰的难度梯度，适合拔高、分层选题和命题借鉴。", items: [["校本", "人大附中校本练习册", "名校资源 · 课堂同步"], ["校本", "北京四中校本练习册", "名校资源 · 变式训练"], ["模拟", "人大附中期末模拟练习", "冲刺选题 · 稀缺参考"], ["校本", "海淀名师伴你学", "本地教辅 · 单元诊断"], ["名校", "北京四中期末分层练", "名校资源 · 题型进阶"], ["名校", "人大附中压轴题周练", "培优训练 · 教师参考"]] },
      { eyebrow: "即用题单 · 真题汇编", title: "北京期末专题复习", badge: "省去检索与筛题", copy: "把分散真题按课内专题重组，老师选定知识点后即可直接布置。", items: [["专题", "数据的收集、整理与表示", "北京初一期末真题汇编"], ["专题", "整式的除法", "北京初一期末真题汇编"], ["培优", "中考专题从入门到满分：实数", "基础到中考衔接"], ["专题", "有理数高频易错题", "课内专题 · 直接布置"], ["专题", "平面直角坐标系变式练", "典型变式 · 优生拔高"], ["培优", "每日一道压轴题", "长期训练 · 名师推荐"]] },
    ],
    深圳: [
      { eyebrow: "镇库资源 · 深圳强区", title: "深圳强区期末真题圈", badge: "南山 · 福田 · 罗湖", copy: "深圳头部教育区的阶段性真题，能直观看到本地命题风格与难度标准，是龙岗老师的重要参照。", items: [["真题", "2026 深圳南山区初一上期末考试", "强区真题 · 本地标尺"], ["真题", "2026 深圳福田区初一下期中考试", "强区真题 · 难度对照"], ["真题", "2026 深圳罗湖区初一下期末考试", "强区真题 · 考点趋势"], ["真题", "2026 深圳宝安区初一下期末考试", "强区真题 · 新增"], ["真题", "2026 深圳龙华区初一下期中考试", "阶段检测 · 可对照"], ["真题", "2026 深圳龙岗区初一期末诊断卷", "本区优先 · 即用"]] },
      { eyebrow: "镇库资源 · 名校周测", title: "深圳中学周测与名校卷", badge: "稀缺命题样本", copy: "名校阶段性测试提供高质量题型与变式，用于冲刺、分层选题和教师命题参考。", items: [["名校", "深圳中学初一期末周测试卷", "名校资源 · 周测结构"], ["校本", "知识能力与练习", "深圳本地教辅 · 同步诊断"], ["同步", "多维导学案", "日常导学 · 分层作业"], ["同步", "全品学练考", "基础补充 · 课时同步"], ["同步", "原创新课堂", "稳定好用 · 日常作业"], ["名校", "深圳名校期中分层卷", "题型进阶 · 教师参考"]] },
      { eyebrow: "AI 特色题单 · 龙岗优先", title: "从错因到二次过关", badge: "真实学情驱动", copy: "不只推荐题：按学生错因生成针对性变式，并用深圳真实情境完成题面更新。", items: [["易错", "龙岗学情·易错二练", "错因诊断 → 变式 → 二练"], ["情境", "深圳真实情境数学题", "考点不变 · 题面更新"], ["专题", "深圳期末真题汇编·全等三角形", "课内专题直接使用"], ["专题", "深圳期末真题汇编·图形的轴对称", "真题重组 · 热门"], ["培优", "深圳数学思维进阶题单", "教材变式 · 优生挑战"], ["专题", "龙岗大单元综合练", "前测到单元测 · 一套齐"]] },
    ],
    平谷: [
      { eyebrow: "本地与邻区真题", title: "平谷阶段检测真题圈", badge: "进度更接近", copy: "平谷与邻区学校的真实阶段性试卷，学生基础与教学进度更可比，适合阶段检测和难度校准。", items: [["真题", "2026 北京平谷期中考试：初一数学", "本区真题 · 阶段检测"], ["真题", "2026 北京通州初一下期中：数学", "邻区真题 · 难度校准"], ["名校", "牛栏山中学初一下期中考试", "名校资源 · 分层选题"], ["模拟", "通州潞河中学期末训练题", "邻区名校 · 模拟卷"], ["真题", "2026 北京平谷初一下期末数学", "本区真题 · 新入库"], ["真题", "2026 北京顺义初一下期中数学", "邻区对照 · 阶段检测"]] },
      { eyebrow: "稳定好用 · 同步练", title: "每日课堂同步练", badge: "课后直接布置", copy: "同步性强、题型完整，满足日常课后练习与基础巩固的稳定供给。", items: [["同步", "启东中学作业本", "基础巩固 · 同步练"], ["同步", "全品作业本", "覆盖全面 · 课后作业"], ["同步", "1 课 3 练课时训练", "课堂同步 · 即用"], ["同步", "原创新课堂", "课时结构 · 分层梯度"], ["校本", "名校课堂", "优质同步 · 题型完整"], ["同步", "每日基础过关练", "10 分钟 · 课堂可用"]] },
      { eyebrow: "北京资源转译", title: "北京真题专题化练习", badge: "补足同步资源", copy: "把北京优质资源转成课内专题练习，形成从基础巩固到培优拔高的连续梯度。", items: [["专题", "数据的收集、整理与表示", "北京真题专题汇编"], ["专题", "整式的除法", "北京真题专题汇编"], ["培优", "冲刺尖子生教材变式", "平面直角坐标系"], ["专题", "实数专题从入门到满分", "基础到中考衔接"], ["培优", "每日一道压轴题", "优生长期训练"], ["专题", "有理数易错巩固练", "课内专题 · 即用"]] },
    ],
  } as const;
  const regionalData = {
    朝阳: { label: "朝阳区优质资源 · 北京核心区", title: "从强区真题到头部校本，一眼看懂北京怎么考", description: "优先呈现东西海朝真题、海淀六小强与西城四金刚校本资源，再以真题汇编转成课内即用题单。", action: "进入朝阳区域题库 →", stats: [["核心区真题", "326 套", "本学期持续更新"], ["名校校本", "84 份", "来源与年份可追溯"], ["专题题单", "162 组", "课内直接布置"], ["教师采用", "1,286 次", "本周真实复用"]], cards: [["强区真题", "东西海朝期末真题圈", "东城 / 海淀 / 西城 · 最新期末", "看命题风向，也能直接做阶段复习。"], ["名校校本", "海淀六小强、西城四金刚", "人大附 / 北京四中等授权校本", "拔高、培优与教师命题参考。"], ["真题汇编", "北京期末专题复习", "按知识点拆卷与重组", "不必再逐张检索和筛题。"]] },
    深圳: { label: "深圳 / 龙岗优质资源 · 本地优先", title: "既看深圳强区怎么考，也用龙岗班级学情去练", description: "强区真题、名校周测、龙岗易错二练与深圳情境题共同构成可教、可练、可复用的本地资源。", action: "进入深圳区域题库 →", stats: [["深圳真题", "298 套", "南福罗等区持续更新"], ["名校资源", "56 份", "周测与校本卷可追溯"], ["龙岗题单", "138 组", "学情驱动的二练"], ["本周复用", "936 次", "真实课堂验证"]], cards: [["深圳强区", "深圳强区期末真题圈", "南山 / 福田 / 罗湖", "深圳本地命题标准与难度对照。"], ["龙岗学情", "龙岗学情·易错二练", "错因诊断 / 针对变式 / 二次过关", "让讲评后的学生真正过关。"], ["深圳情境", "深圳真实情境数学题", "本地情境改编 · 考点不变", "同一考点，换成学生熟悉的题面。"]] },
    平谷: { label: "平谷优质资源 · 邻区补充", title: "用本地检测校准，再把北京好题转成日常练习", description: "平谷真实阶段性检测为底座，通州与牛栏山等邻区资源做对照，配合高质量同步练补足供给。", action: "进入平谷区域题库 →", stats: [["本地与邻区卷", "126 套", "进度接近、难度可比"], ["同步练习", "1,208 份", "课后直接布置"], ["专题题单", "96 组", "北京资源转译"], ["本周复用", "684 次", "覆盖基础与拔高"]], cards: [["阶段检测", "平谷阶段检测真题圈", "平谷 / 通州 / 牛栏山", "最贴近日常教学进度与班级基础。"], ["同步练", "每日课堂同步练", "启东 / 全品 / 1 课 3 练", "稳定好用的课后练习供给。"], ["专题转译", "北京真题专题化练习", "课内知识点重组", "用北京资源补足本地同步练。"]] },
  } as const;
  const schoolData = {
    朝阳: { ...regionalData.朝阳, label: "朝阳校本资源 · 课堂验证", title: "头部学校的好题，沉淀成每位老师都能用的题单", action: "进入朝阳校本题库 →", cards: [["校本精选", "人大附中校本练习册", "课时同步 / 变式训练 / 使用记录", "从个人资源转成可复用的备课组资产。"], ["校本精选", "北京四中校本练习册", "分层作业 / 命题参考 / 版本可追溯", "保留高质量校本卷的来源与更新记录。"], ["课堂验证", "名师专题复习题单", "真题重组 / 课堂采用 / 学生反馈", "每一道推荐都有真实课堂依据。"]] },
    深圳: { ...regionalData.深圳, label: "深圳 / 龙岗校本资源 · 课堂验证", title: "把深圳好题变成龙岗班级真正能用的练习", action: "进入深圳校本题库 →", cards: [["课堂验证", "龙岗学情·易错二练", "错因标签 / 分层补偿 / 二次练", "班级真实错误会沉淀为下次可直接使用的题单。"], ["校本精选", "深圳中学周测精选", "名校周测 / 题型拆解 / 版本留存", "高质量题型可被教研组安全复用。"], ["共创题单", "深圳真实情境数学题", "本地情境 / 考点不变 / 教师共创", "让校本题既有新鲜感，也保持教学目标稳定。"]] },
    平谷: { ...regionalData.平谷, label: "平谷校本资源 · 教研共创", title: "把稳定好用的同步资源，变成更懂本班的校本练习", action: "进入平谷校本题库 →", cards: [["课堂验证", "平谷同步分层练", "基础 / 提升 / 挑战 · 课堂反馈", "同一课时兼顾不同学生的基础。"], ["教研共创", "平谷一课一练精品包", "例题 / 随堂练 / 作业 / 讲评", "备课组共用一套可持续改进的课时资源。"], ["校本命题", "平谷阶段检测改编题", "邻区真题改编 / 本班适配 / 版本沉淀", "保留来源，也适配本校学生的能力层级。"]] },
  } as const;
  const recommendationColumns = recommendationSets[district];
  const activeResource = resourceTab === "区域题库" ? regionalData[district] : schoolData[district];
  const resourceFeed = {
    朝阳: {
      区域题库: [["真题", "2026 北京海淀初一（下）期末数学", "海淀 · 今日更新"], ["真题", "2026 北京西城初一（下）期末数学", "西城 · 评分点已拆解"], ["真题", "2026 北京东城初一（下）期末数学", "东城 · 本周热门"], ["名校", "2026 北京四中初一（下）期末数学", "西城四金刚 · 原卷"], ["校本", "人大附中校本练习册", "海淀六小强 · 课时同步"], ["校本", "北京四中校本练习册", "名校资源 · 变式训练"], ["模拟", "人大附中期末模拟练习", "冲刺选题 · 稀缺参考"], ["专题", "数据的收集、整理与表示", "北京初一期末真题汇编"], ["专题", "整式的除法", "北京初一期末真题汇编"], ["培优", "中考专题从入门到满分：实数", "基础到中考衔接"], ["培优", "冲刺尖子生教材变式：平面直角坐标系", "优生拔高 · 典型变式"], ["同步", "朝阳新目标检测", "本地教辅 · 单元诊断"]],
      校本题库: [["校本", "人大附中七年级数学一课一练", "课堂采用 126 次"], ["校本", "北京四中整式专题分层练", "备课组共创 · 第 4 版"], ["教研", "朝阳期末真题讲评包", "题型拆解 · 评分点"], ["校本", "海淀名师伴你学", "同步诊断 · 基础补偿"], ["共创", "数据收集整理项目任务单", "课堂探究 · 可编辑"], ["共创", "实数分层过关练", "7:2:1 难度结构"], ["验证", "初一整式除法易错二练", "错因标签 · 二次过关"], ["验证", "平面直角坐标系变式练", "教师复用 48 次"], ["名师", "北京期末命题趋势题单", "真题重组 · 本周新增"], ["校本", "有理数高频错题集", "班级学情驱动"], ["讲评", "期末压轴题每日一题", "培优长期训练"], ["素材", "朝阳名校同步教案包", "例题 + 随堂练 + 作业"]],
    },
    深圳: {
      区域题库: [["真题", "2026 深圳南山区初一上期末考试", "南山 · 今日更新"], ["真题", "2026 深圳福田区初一下期中考试", "福田 · 强区标尺"], ["真题", "2026 深圳罗湖区初一下期末考试", "罗湖 · 考点趋势"], ["名校", "深圳中学初一期末周测试卷", "名校周测 · 题型拆解"], ["校本", "知识能力与练习", "深圳本地教辅 · 同步诊断"], ["同步", "全品学练考", "课时同步 · 基础补充"], ["同步", "原创新课堂", "日常作业 · 稳定好用"], ["同步", "多维导学案", "预习到分层作业"], ["易错", "龙岗学情·易错二练", "错因诊断 → 二次过关"], ["情境", "深圳真实情境数学题", "考点不变 · 题面更新"], ["专题", "深圳期末真题汇编·图形的轴对称", "课内专题 · 直接布置"], ["专题", "深圳期末真题汇编·全等三角形", "真题重组 · 本周热门"]],
      校本题库: [["课堂", "龙岗七年级有理数易错二练", "真实错因 · 课堂验证"], ["校本", "深圳中学周测精选", "名校题型 · 版本可追溯"], ["共创", "深圳真实情境数学题", "教师共创 · 考点稳定"], ["校本", "龙岗同步诊断：知识与能力练习", "本地教辅 · 基础过关"], ["教研", "全等三角形期末真题讲评包", "真题拆解 · 讲评即用"], ["教研", "图形的轴对称专题课时包", "例题 + 随堂练 + 作业"], ["验证", "负数比较易错补偿练", "二练后正确率 91%"], ["验证", "整式加减分层作业", "基础 / 提升 / 挑战"], ["名师", "深圳数学思维进阶题单", "教材变式 · 优生挑战"], ["校本", "龙岗期中考前 15 分钟练", "班级真实使用"], ["讲评", "深圳强区真题同类题", "讲完即练 · 变式补偿"], ["素材", "龙岗大单元练习包", "前测、课时练、单元测"]],
    },
    平谷: {
      区域题库: [["真题", "2026 北京平谷期中考试：初一数学", "平谷 · 阶段检测"], ["真题", "2026 北京通州初一下期中：数学", "邻区 · 难度校准"], ["名校", "牛栏山中学初一下期中考试", "区域名校 · 原卷"], ["模拟", "通州潞河中学初一下期末训练题", "名校模拟 · 分层选题"], ["同步", "启东中学作业本", "课时同步 · 基础巩固"], ["同步", "全品作业本", "覆盖全面 · 日常作业"], ["同步", "1 课 3 练课时训练", "课后直接布置"], ["同步", "原创新课堂", "课时结构完整"], ["校本", "名校课堂", "优质同步资源"], ["专题", "数据的收集、整理与表示", "北京初一期末真题汇编"], ["专题", "整式的除法", "北京初一期末真题汇编"], ["培优", "冲刺尖子生教材变式", "平面直角坐标系"]],
      校本题库: [["课堂", "平谷七年级基础同步练", "课后直接布置"], ["校本", "平谷期中真题讲评包", "本区真题 · 评分点拆解"], ["共创", "有理数课时分层练", "基础 / 提升 / 挑战"], ["教研", "邻区真题专题化练习", "通州与牛栏山资源转译"], ["校本", "整式运算易错二练", "错因标签 · 二次过关"], ["校本", "数据整理探究任务单", "课堂活动 · 可编辑"], ["验证", "平谷班级错题补偿包", "真实学情 · 本周新增"], ["验证", "期中 15 分钟随堂练", "课堂完成率 94%"], ["名师", "实数专题从入门到满分", "基础到中考衔接"], ["校本", "每日一道压轴题", "培优长期训练"], ["讲评", "平面直角坐标系变式练", "典型变式 · 拔高"], ["素材", "平谷一课一练精品包", "例题 + 随堂练 + 作业"]],
    },
  } as const;
  const visibleResources = resourceFeed[district][resourceTab];
  const resourceChannels = [
    { icon: "真", title: "强区真题", count: district === "朝阳" ? "326 套" : district === "深圳" ? "298 套" : "126 套", meta: district === "深圳" ? "南山、福田、罗湖持续更新" : district === "朝阳" ? "东西海朝期中期末全覆盖" : "平谷与邻区阶段检测" },
    { icon: "校", title: "名校校本", count: district === "朝阳" ? "84 份" : district === "深圳" ? "56 份" : "42 份", meta: "来源、年份与版本均可追溯" },
    { icon: "专", title: "专题题单", count: district === "朝阳" ? "162 组" : district === "深圳" ? "138 组" : "96 组", meta: "按课内知识点重组，拿来即用" },
    { icon: "练", title: "同步与分层", count: district === "朝阳" ? "1,468 份" : district === "深圳" ? "1,286 份" : "1,208 份", meta: "同步练、易错二练与大单元练习" },
  ];
  const usageSignals = district === "朝阳"
    ? [["本周最热", "2026 北京海淀初一（下）期末数学", "186 位老师查看"], ["正在使用", "北京期末专题复习", "本周布置 74 次"], ["刚刚入库", "朝阳新目标检测", "已完成章节标注"]]
    : district === "深圳"
      ? [["本周最热", "2026 深圳南山区初一上期末考试", "213 位老师查看"], ["正在使用", "龙岗学情·易错二练", "本周布置 96 次"], ["刚刚入库", "深圳期末真题汇编·全等三角形", "已完成考点拆解"]]
      : [["本周最热", "2026 北京平谷期中考试：初一数学", "98 位老师查看"], ["正在使用", "每日课堂同步练", "本周布置 68 次"], ["刚刚入库", "平谷一课一练精品包", "已完成分层标注"]];
  const personalTrail = [
    ["上次备课", "有理数第 3 课 · 随堂练", "你选择了 8 道本地真题 · 2 道易错变式", "继续编辑"],
    ["已布置", "七年级 2 班 · 易错点巩固", "36 人已完成 · 负数比较仍需二练", "生成二练"],
    ["已收藏", "深圳强区期末真题圈", "收藏 14 份 · 最新新增 3 份", "查看更新"],
  ];
  if (aiRequest && !generating) {
    return <AgentWorkspace request={aiRequest} notify={notify} navigate={navigate} newTask={newTask} />;
  }

  return <>
    <section className="library-home">
      <header className="library-hero"><span className="spark">✦</span><h1>说出教学目标，AI 帮你找题、组卷、组练习、改编和命题</h1></header>

      <section className="browse-workbench" aria-label="题单浏览工作台">
        <div className="browse-context"><div><span className="location-mark">⌾</span><b>{district === "深圳" ? "深圳市龙岗区" : `${district}区`}</b><i></i><b>七年级数学</b><small>已根据你的教学身份自动匹配</small></div><div className="district-switch" aria-label="切换地区">{(["朝阳", "深圳", "平谷"] as const).map((item) => <button key={item} className={district === item ? "active" : ""} onClick={() => setDistrict(item)}>{item}{item === "深圳" && <small>龙岗</small>}</button>)}</div></div>
        <div className="browse-tabs"><div><b>浏览题单</b><small>{district === "深圳" ? "1,286" : district === "朝阳" ? "1,468" : "1,208"} 份</small></div>{browseTabs.map((item) => <button key={item} className={browseTab === item ? "active" : ""} onClick={() => { setBrowseTab(item); notify(`已切换至“${item}”，可继续按教材、知识点和难度细筛`); }}>{item}</button>)}</div>
        <div className="ai-match-strip"><span>✦</span><div><b>AI 已读懂你的备课上下文</b><small>七年级 · 人教版 · 第二章有理数 · {district === "深圳" ? "龙岗 2 班符号判断错误率 37%" : district === "朝阳" ? "本周正在进行期末专题复习" : "当前以课时同步与基础巩固为主"}</small></div><button onClick={() => runAi(`优先使用${district}本地资源，结合当前班级薄弱点，推荐 3 份可直接使用的七年级数学题单`)}>给我推荐 3 份 →</button><button className="quiet" onClick={() => notify("你可以在底部输入框随时修改年级、教材、班级与资源优先级")}>调整依据</button></div>
      </section>

      <section className="weekly-overview" aria-label="本周热门与资源更新">
        <article className="weekly-hot"><div className="weekly-title"><div><span>依据近 7 天真实使用数据</span><h2>本周{district}热门题单</h2></div><button onClick={() => notify("已打开完整榜单，可按采用人数、完成率和更新时间排序")}>完整榜单 →</button></div><div className="weekly-rank">{[...usageSignals, ["本周新增", `${district}期末基础保分题单`, "1,143 次使用"]].map(([label, title, meta], index) => <button key={title} onClick={() => runAi(`使用“${title}”生成一份适合当前班级的练习`)}><b>0{index + 1}</b><div><strong>{title}</strong><small>{label} · {index === 0 ? "24 题 · 35 分钟" : index === 1 ? "20 题 · 25 分钟" : "15 题 · 20 分钟"}</small></div><span>{meta}</span><i>›</i></button>)}</div></article>
        <article className="update-board"><div><span><i></i> 最近更新于 10 分钟前</span><button onClick={() => notify("已打开全部资源更新记录")}>更新记录</button></div><h2>优质资源持续更新</h2><section>{[["今日新增题目", "1,842", "道"], ["今日新增题单", "68", "份"], ["新整理试卷", "26", "套"], ["更新教材章节", "14", "章"]].map(([label, value, unit]) => <article key={label}><span>{label}</span><b>{value}<small>{unit}</small></b></article>)}</section><p>来自 {district}区教研、学校共建和本地常用资源</p></article>
      </section>

      <section className="popular-shelf" aria-label="老师正在用的好题单"><div className="shelf-head"><div><h2>老师正在用的好题单</h2><p>不是题很多，而是已经被选好、编好，可以直接拿去用</p></div><button onClick={() => notify("已打开全部高采用题单")}>查看全部 →</button></div><div>{recommendationColumns.map((column, index) => <article key={column.title} className={`popular-card card-${index}`}><span>{index === 0 ? "适合当前教学进度" : index === 1 ? "本周收藏增长最快" : "老师高频复用"}</span><h3>{column.title}</h3><p>{column.copy}</p><div><b>{column.items[0][1]}</b><small>{column.items[0][2]}</small></div><footer><span>{index === 0 ? "386 位老师使用" : index === 1 ? "1,206 位老师使用" : "842 位老师使用"}</span><button onClick={() => notify(`推荐依据：${index === 0 ? "当前教材进度、班级薄弱点和本地资源优先" : index === 1 ? "近 7 天同年级老师收藏与复用增长" : "同地区同年级老师的高频采用"}`)}>为什么推荐</button><button className="open-list" onClick={() => runAi(`使用“${column.items[0][1]}”生成一份适合当前班级的练习`)}>查看题单 →</button></footer></article>)}</div></section>

      <section className="textbook-explorer" aria-label="跟着教材进度找"><div className="shelf-head"><div><h2>跟着当前教材进度找</h2><p>人教版七年级上册 · 按教材目录快速定位题单</p></div><button onClick={() => notify("已打开完整教材目录")}>完整教材目录 →</button></div><div className="textbook-panel"><aside>{textbookUnits.map((unit, index) => <button key={unit.title} className={selectedUnit === index ? "active" : ""} onClick={() => setSelectedUnit(index)}><b>0{index + 1}</b><div><strong>{unit.title}</strong><small>{unit.count}</small></div></button>)}</aside><section><header><span>第二章 · {currentUnit.title}</span><b>本章共 {currentUnit.count}</b></header>{currentUnit.rows.map(([title, meta, usage], index) => <button key={title} onClick={() => runAi(`使用“${title}”生成一份适合当前班级的练习`)}><b>0{index + 1}</b><div><strong>{title}</strong><small>{meta}</small></div><span>{usage}</span><i>›</i></button>)}</section></div></section>

      <section className="resource-showcase" aria-label="资源展示">
        <div className="resource-tabbar"><div><button className={resourceTab === "区域题库" ? "active" : ""} onClick={() => setResourceTab("区域题库")}>区域题库</button><button className={resourceTab === "校本题库" ? "active" : ""} onClick={() => setResourceTab("校本题库")}>校本题库</button></div><span className="resource-district">当前地区：{district}{district === "深圳" ? " · 龙岗优先" : ""}</span><button className="resource-entry" onClick={() => navigate(resourceTab === "区域题库" ? "试卷" : "我的资源")}>{activeResource.action}</button></div>
        <div className="resource-hub-main"><div className="resource-intro"><div><span>{activeResource.label}</span><h2>{activeResource.title}</h2><p>{activeResource.description}</p></div><div className="resource-stats">{activeResource.stats.map(([label, value, hint]) => <article key={label}><span>{label}</span><b>{value}</b><small>{hint}</small></article>)}</div></div>
          <section className="resource-rack" aria-label="资源频道"><div className="resource-rack-head"><div><span>像逛内容平台一样探索题库</span><h3>先选频道，再进入你需要的具体资源</h3></div><p>资源持续增加，但每次只把最相关的放到你眼前</p></div><div className="resource-channel-grid">{resourceChannels.map((channel) => <button key={channel.title} onClick={() => notify(`已切换至“${channel.title}”频道，可继续按年级、教材与知识点筛选`)}><span>{channel.icon}</span><div><b>{channel.title}</b><strong>{channel.count}</strong><small>{channel.meta}</small></div><i>→</i></button>)}</div><div className="resource-feed-head"><span>本周可直接使用</span><b>{district}{resourceTab === "区域题库" ? "区新入库资源" : "校本精选资源"}</b><small>已按本地性、质量与最近采用排序</small></div><div className="resource-feed">{visibleResources.map(([type, title, meta]) => <button key={title} onClick={() => runAi(`使用“${title}”生成一份适合当前班级的练习`)}><span className={`feed-type ${resourceTagClass(type)}`}>{type}</span><div><b>{title}</b><small>{meta}</small></div><i>›</i></button>)}</div></section></div>
        <section className="social-proof" aria-label="老师都在用"><div className="social-proof-head"><div><span>真实采用，让资源持续变好</span><h3>{district}老师都在用</h3></div><button onClick={() => notify("已按教师采用量、课堂反馈和本周更新排序")}>按真实采用排序 →</button></div><div>{usageSignals.map(([label, title, meta]) => <button key={title} onClick={() => runAi(`使用“${title}”生成适合当前班级的练习`)}><span>{label}</span><b>{title}</b><small>{meta}</small><i>查看 →</i></button>)}</div></section>
        <div className="resource-cards-head"><span>资源为什么值得信任</span><b>每类资源都有明确的来源、用途与使用依据</b></div><div className="resource-cards">{activeResource.cards.map(([region, title, tags, description]) => <article key={title}><span>{region}</span><h3>{title}</h3><b>{tags}</b><p>{description}</p><button onClick={() => runAi(`为我推荐“${title}”相关的题单，优先本地可用资源`)}>查看题单 →</button></article>)}</div>
      </section>
      <section className="personal-trail" aria-label="我的题库轨迹"><div className="personal-trail-head"><div><span>持续沉淀，题库会越来越懂你</span><h2>我的题库轨迹</h2><p>你备过的课、布置过的练习和收藏的资源，都会成为下次推荐的依据。</p></div><button onClick={() => navigate("我的资源")}>查看我的全部资源 →</button></div><div className="personal-trail-list">{personalTrail.map(([label, title, meta, action]) => <article key={title}><span>{label}</span><h3>{title}</h3><p>{meta}</p><button onClick={() => action === "生成二练" ? runAi("根据七年级 2 班的负数比较错误生成一份二次过关练") : action === "继续编辑" ? runAi("继续编辑有理数第 3 课随堂练") : navigate("我的资源")}>{action} →</button></article>)}</div></section>
    </section>

    <section className="bottom-composer" aria-label="题库 Agent 教学需求输入">
      <div className="context-row"><span>已自动带入</span>{contexts.map((item) => <button className="context-chip" key={item} title={`移除${item}`} onClick={() => setContexts(contexts.filter((context) => context !== item))}>{item}<b>×</b></button>)}<button className="add-context" onClick={() => { const next = contextPresets.find((item) => !contexts.includes(item)); if (next) setContexts([...contexts, next]); else notify("常用条件都已添加，也可以直接在输入框里补充"); }}>＋ 添加条件</button></div>
      <div className="composer-input"><span>✦</span><textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例如：帮我组一份七年级有理数随堂练习，15 分钟，基础为主，加入 2 道易错题" aria-label="输入教学需求" onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); runAi(); } }} /><button onClick={() => runAi()}>生成 <b>↑</b></button></div>
      <div className="quick-prompts"><small>不知怎么说？</small>{quick.map((item) => <button key={item} onClick={() => runAi(item)}>{item}</button>)}</div>
    </section>

    {generating && <section className="generation-state"><span>✦</span><div><b>题库 Agent 正在组装最合适的内容</b><p>先匹配本地精品题 → 校验知识点与难度 → 用班级薄弱点补足</p></div><i></i></section>}
    <Footer />
  </>;
}

const teacherRecords = [
  { title: "本周易错点巩固", request: "用本周易错点生成 15 题巩固练习", result: "初二 3 班 · 一次函数分层巩固", time: "今天 10:32", detail: "换题 2 道 · 降低难度 1 次", used: "已布置" },
  { title: "一次函数课后作业", request: "给初二 3 班出一次函数课后作业，30 分钟", result: "一次函数基础过关练习", time: "昨天 16:48", detail: "采用本地题 10 道 · 改编 2 道", used: "已使用" },
  { title: "几何压轴题选练", request: "找近三年本地中考几何压轴题，难度适中", result: "中考几何压轴题精选", time: "周一 09:15", detail: "收藏 8 道 · 组成 1 份试卷", used: "已收藏" },
  { title: "月考错题重练", request: "把月考错题按知识点重新生成一份练习", result: "初二 3 班月考错题重练", time: "上周五", detail: "学生完成率 96% · 平均分 +7", used: "已完成" },
];

function AgentWorkspace({ request, notify, navigate, newTask }: { request: string; notify: (message: string) => void; navigate: (target: Nav) => void; newTask: () => void }) {
  const [record, setRecord] = useState(0);
  const [followup, setFollowup] = useState("");
  const [variant, setVariant] = useState(0);
  const [easy, setEasy] = useState(() => request.includes("基础") || request.includes("简单"));
  const [localFirst, setLocalFirst] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [learned, setLearned] = useState(request.includes("基础") ? "已识别：本次需要基础题更多" : "");
  const [lastChange, setLastChange] = useState("首次生成：按需求完成题量、时长与难度配置");
  const [messages, setMessages] = useState([
    { role: "teacher", text: request },
    { role: "agent", text: "已优先匹配 12 道本地现成好题，并根据班级薄弱点改编 3 道。答案、解析和难度已经校验。" },
  ]);

  const current = record === 0
    ? { ...teacherRecords[0], title: taskTitleFromRequest(request), request, result: `初二 3 班 · ${taskTitleFromRequest(request)}` }
    : teacherRecords[record];

  const askAgain = (preset?: string) => {
    const value = (preset || followup).trim();
    if (!value) { notify("可以继续说：再简单一点、换成本地期中题，或者生成一份新的练习"); return; }
    const isEasier = value.includes("简单") || value.includes("基础");
    const isLocal = value.includes("本地") || value.includes("期中");
    const reply = isEasier
      ? "已把基础题提高到 60%，替换 3 道偏难题，预计平均分提升 4 分。"
      : isLocal
        ? "已优先换成双十中学与厦门一中的近期考试题，12 道题保留完整来源。"
        : "已根据新要求生成一个版本，右侧内容、需求兑现和推荐依据已同步更新。";
    setMessages([...messages, { role: "teacher", text: value }, { role: "agent", text: reply }]);
    if (isEasier) {
      setEasy(true);
      setLearned("已学习：初二 3 班优先基础题，合适占比约 60%");
      setLastChange("相比上一版：替换 3 题 · 基础题 +20% · 预计平均分 +4");
    } else if (isLocal) {
      setLocalFirst(true);
      setLearned("已学习：优先使用本地学校近期考试题");
      setLastChange("相比上一版：换入 4 道本地期中题 · 来源信息全部保留");
    } else {
      setLastChange("相比上一版：已按新要求更新内容与结构");
    }
    setVariant(variant + 1);
    setFollowup("");
    notify("题库 Agent 已完成调整，并更新了本班用题偏好");
  };

  return <section className="agent-layout">
    <aside className="agent-sidebar">
      <div className="agent-brand"><span>✦</span><div><b>题库 Agent</b><small><i></i> 正在为林老师工作</small></div></div>
      <button className="new-agent-task" onClick={newTask}>＋ 新建任务</button>
      <div className="record-title"><b>林老师的工作记录</b><span>自动沉淀</span></div>
      <div className="record-list">{teacherRecords.map((item, index) => <button key={item.title} className={record === index ? "active" : ""} onClick={() => { setRecord(index); setMessages([{ role: "teacher", text: item.request }, { role: "agent", text: `已打开“${item.result}”，可以继续修改或生成新版本。` }]); }}><div><b>{item.title}</b><span>{item.time}</span></div><p>{item.detail}</p><small>{item.used}</small></button>)}</div>
      <div className="teacher-memory"><span>Agent 记住了</span><div><b>常用班级</b><p>初二 3 班</p></div><div><b>偏好</b><p>基础题优先 · 30–40 分钟 · 含解析</p></div>{learned && <div className="memory-update"><b>本次新学习</b><p>{learned}</p></div>}<button onClick={() => notify("已打开林老师的题库偏好，可查看、修改或删除记忆")}>管理题库记忆 →</button></div>
      <section className="agent-chat">
        <div className="conversation-title"><div><span>✦</span><b>继续完善当前结果</b></div><small>上下文与修改记录自动保留</small></div>
        <div className="messages">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`message ${message.role}`}><span>{message.role === "teacher" ? "林" : "✦"}</span><p>{message.text}</p></div>)}</div>
        <div className="agent-events"><span>Agent 执行记录</span><div><i>✓</i><p>检索 28,426 道本地题目</p><small>0.4 秒</small></div><div><i>✓</i><p>匹配班级易错点与教学进度</p><small>0.8 秒</small></div><div><i>✓</i><p>校验答案、解析与难度结构</p><small>1.2 秒</small></div></div>
        <div className="followup-presets"><button onClick={() => askAgain("再简单一点，基础题增加到 60%")}>再简单一点</button><button onClick={() => askAgain("换成本地学校最近的期中题")}>换成本地期中题</button><button onClick={() => askAgain("保持考点，再生成一份周末练习")}>生成周末练习</button></div>
        <div className="followup-box"><textarea value={followup} onChange={(e) => setFollowup(e.target.value)} placeholder="继续提问，例如：第 6 题太难，换一道……" onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); askAgain(); } }} /><button onClick={() => askAgain()}>发送 ↑</button></div>
      </section>
    </aside>

    <div className="agent-main">
      <header className="agent-header"><div><span>当前任务</span><h1>{current.title}</h1><p>{current.request}</p></div><div><button onClick={() => notify("当前版本及全部修改记录已保存到“我的资源”")}>保存版本</button><button onClick={() => navigate("我的资源")}>查看记录</button><button className="primary" onClick={() => { setAssigned(true); setLearned("已学习：老师最终采用基础题 60%、本地题优先的版本"); notify("已布置给初二 3 班；本次采用结果已用于更新下次推荐"); }}>{assigned ? "已布置 ✓" : "直接布置"}</button></div></header>
      <section className="agent-output">
        <div className="output-head"><div><span>✓ 已完成 · 第 {variant + 1} 版</span><h2>{current.result}</h2><p>15 题 · 40 分钟 · {easy ? "基础题 60%" : "中等难度"} · 预计平均得分 {easy ? 86 : 82}</p></div><div><button onClick={() => { const nextEasy = !easy; setEasy(nextEasy); setVariant(variant + 1); setLastChange(nextEasy ? "相比上一版：基础题提高到 60% · 预计平均分 +4" : "相比上一版：恢复中等难度结构"); setLearned(nextEasy ? "已学习：本班更适合基础题占比约 60%" : "已记录：本次恢复中等难度"); notify(nextEasy ? "已降低难度并更新班级偏好" : "已恢复中等难度"); }}>{easy ? "恢复难度" : "降低难度"}</button><button onClick={() => { setVariant(variant + 1); setLastChange("相比上一版：第 6 题已替换 · 考点与分值不变"); notify("已替换第 6 题并保留原考点"); }}>换一道题</button></div></div>
        <div className="requirement-strip"><div><span>需求兑现</span><b>{easy ? "基础题 60%" : "基础题 40%"}</b></div><div><span>本地现成题</span><b>{localFirst ? "15 / 15" : "12 / 15"}</b></div><div><span>班级易错点</span><b>覆盖 2 个</b></div><p>{lastChange}</p></div>
        <div className="output-content"><PaperSheet compact variant={variant} easy={easy} title={current.result} /><aside className="agent-evidence"><h3>这份结果的依据</h3><div><b>{localFirst ? "15 / 15" : "12 / 15"}</b><p>来自本地现成好题<small>近一年采用率 94%</small></p></div><div><b>{localFirst ? "0" : "3"}</b><p>根据班级薄弱点改编<small>聚焦图象识别与实际应用</small></p></div><div><b>100%</b><p>答案与解析已校验<small>2 道题含教研点评</small></p></div>{learned && <div className="learned-evidence"><b>已学习</b><p>{learned}<small>下次推荐将自动优先</small></p></div>}<button onClick={() => navigate("试卷")}>查看完整试卷 →</button></aside></div>
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
    <header className="page-header"><div><span className="page-kicker">每道题都可验证、可追溯、可改编</span><h1>题目</h1><p>先看内容与依据，再决定是否使用。</p></div><button className="primary-button" onClick={() => runAi("从本地题库找适合初二 3 班的一次函数巩固题")}>✦ 让 Agent 替我找</button></header>
    <div className="resource-finder"><button className={showCatalog ? "active" : ""} onClick={() => setShowCatalog(!showCatalog)}>☰ 教材目录</button><label><span>年级</span><select value={grade} onChange={(e) => setGrade(e.target.value)}><option>八年级下</option><option>九年级上</option></select></label><button className="wide" onClick={() => setShowCatalog(!showCatalog)}>{chapter}⌄</button><label><span>难度</span><select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option>全部难度</option><option>基础</option><option>中等</option></select></label><label><span>来源</span><select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}><option>全部来源</option><option>本地真题</option><option>名校精选</option></select></label><button className="reset" onClick={() => { setGrade("八年级下"); setChapter("第四章 一次函数"); setDifficulty("全部难度"); setSourceFilter("全部来源"); setFilter("推荐给我"); }}>重置</button></div>
    {showCatalog && <div className="catalog-panel"><div><b>北师大版 · {grade}</b><span>选择教材章节，右侧题目会立即更新</span></div><div>{chapters.map((item) => <button key={item} className={chapter === item ? "active" : ""} onClick={() => { setChapter(item); setShowCatalog(false); notify(`已切换到${item}`); }}>{item}<small>{item.includes("一次函数") ? "326 题" : item.includes("三角形") ? "248 题" : "180+ 题"}</small></button>)}</div></div>}
    <div className="filter-bar">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}<span>共 {visible.length} 道示例 · 最近更新优先</span></div>
    <div className="question-layout">
      <div className="question-cards">{visible.length === 0 && <div className="empty-result"><span>暂时没有同时满足这些条件的题目</span><p>可以放宽难度或来源，也可以让 Agent 按当前条件生成。</p><button onClick={() => { setDifficulty("全部难度"); setSourceFilter("全部来源"); setFilter("推荐给我"); }}>清除筛选</button></div>}{visible.map((q) => <article className={opened === q.id ? "open" : ""} key={q.id}>
        <button className="question-main" onClick={() => setOpened(opened === q.id ? "" : q.id)}>
          <div className="q-top"><span>{q.type}</span><i>{q.difficulty}</i><small>{q.updated}</small></div><h3>{q.stem}</h3><div className="options-row">{q.options.map((option) => <span key={option}>{option}</span>)}</div><div className="source-row"><span>来源</span><div><b>{q.source}</b><small>{q.sourceDetail} · {q.usage}</small></div><i>{q.tag}</i></div>
        </button>
        {opened === q.id && <div className="answer-panel"><span>答案 {q.answer}</span><p>{q.analysis}</p></div>}
        <div className="q-actions"><button className="adapt" onClick={() => runAi(`把“${q.title}”改编成适合初二 3 班的题目，考点不变，情境更新`)}>✦ Agent 改编</button><button onClick={() => setOpened(opened === q.id ? "" : q.id)}>{opened === q.id ? "收起解析" : "查看解析"}</button><button onClick={() => { notify("已找到 3 道同考点、不同情境的题目"); setOpened(q.id); }}>找相似题</button><button onClick={() => toggleSaved(q.id)}>{saved.includes(q.id) ? "已收藏 ✓" : "收藏"}</button><button className="add" onClick={() => toggleBasket(q.id)}>{basket.includes(q.id) ? "已加入试卷 ✓" : "加入试卷 +"}</button></div>
      </article>)}</div>
      <aside className="question-ai"><span>✦ Agent 选题观察</span><h3>这组题为什么适合你</h3><p>初二 3 班最近在“一次函数图象识别”上的错误率为 38%，高于同年级 11 个百分点。</p><div><b>建议</b><span>先做第 1 题检查概念，再用第 3 题迁移到实际情境。</span></div><button onClick={() => runAi("用这组题生成一份 20 分钟的随堂练习")}>用这组题生成练习 →</button></aside>
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
        <div className="paper-toolbar"><div><span>已完成质量校验</span><b>{paper.name}</b><small>{paper.score} 分 · {paper.duration} 分钟 · 难度 {paper.difficulty}</small></div><div><button onClick={() => toggleSaved(paper.id)}>{saved.includes(paper.id) ? "已收藏 ✓" : "收藏"}</button><button onClick={() => notify("已打开打印预览：A4 双面，含答题区")}>打印预览</button><button onClick={() => runAi(`按初二 3 班学情改编《${paper.name}》`)}>✦ Agent 改编</button><button className="primary" onClick={() => { setCopyMade(true); notify("已创建可编辑副本，可自由增删和换题"); }}>{copyMade ? "已创建副本 ✓" : "创建可编辑副本"}</button></div></div>
        <PaperSheet title={paper.name} paperId={paper.id as keyof typeof paperContents} score={paper.score} duration={paper.duration} />
      </div>
    </div><Footer />
  </section>;
}

function PaperSheet({ compact = false, title = "初二 3 班 · 一次函数分层巩固", variant = 0, easy = false, paperId = "p3", score = 100, duration }: { compact?: boolean; title?: string; variant?: number; easy?: boolean; paperId?: keyof typeof paperContents; score?: number; duration?: number }) {
  const content = paperContents[paperId];
  const displayDuration = duration ?? (compact ? 40 : 100);
  return <div className={`paper-sheet ${compact ? "compact" : ""}`}>
    <div className="sheet-title"><span>题库 Agent 智能组卷</span><h2>{title}</h2><p>满分：{score} 分　考试时间：{displayDuration} 分钟　姓名：__________　班级：__________</p></div>
    <section><h3>{content.section}</h3>
      {content.questions.map((question, index) => <div className="sheet-question" key={question.no}><b>{question.no}</b><p>{index === 1 && variant % 2 === 1 ? "若直线 y＝kx−1 经过点 (3,5)，则 k 的值为（　）" : question.text}<span>{question.options}</span></p><i>{index === 1 && easy ? "基础题" : question.tag}</i></div>)}
    </section>
    <section><h3>二、填空题（每题 4 分，共 24 分）</h3>{content.fill.map((question) => <div className="sheet-question" key={question.no}><b>{question.no}</b><p>{question.text}</p><i>{question.tag}</i></div>)}</section>
    {!compact && <section><h3>三、解答题（共 46 分）</h3><div className="sheet-question long"><b>17.</b><p>{content.long}</p><i>综合应用</i></div></section>}
    <footer><span>题目来源可追溯 · 答案解析已校验</span><b>第 1 页 / 共 {compact ? 2 : 6} 页</b></footer>
  </div>;
}

const resourceHistory = {
  最近使用: [
    { type: "已布置", title: "初二 3 班 · 一次函数分层练习", meta: "今天 10:32 · 第 3 版", evidence: "基础题 60% · 学生预计完成率 92%", action: "查看记录" },
    { type: "已完成", title: "月考错题重练", meta: "上周五 · 36 人完成", evidence: "平均分 +7 · 4 道题进入校本候选", action: "查看学情" },
    { type: "已使用", title: "一次函数基础过关练习", meta: "昨天 16:48 · 第 2 版", evidence: "换题 2 道 · 最终采用 12 道", action: "继续修改" },
  ],
  我的收藏: [
    { type: "本地真题", title: "一次函数图象与坐标轴围成的面积", meta: "厦门市 2026 初三一模 · 第 8 题", evidence: "近 30 天采用 184 次 · 答案解析已校验", action: "查看题目" },
    { type: "校本优质题", title: "二次根式的化简与估值", meta: "厦门一中校本作业", evidence: "使用验证 12 次 · 学生正确率 72%", action: "查看题目" },
  ],
  我的试卷: [
    { type: "当前编辑", title: "初二 3 班周四随堂练习", meta: "15 题 · 40 分钟 · 第 3 版", evidence: "本地题 12 道 · 改编题 3 道", action: "继续组卷" },
    { type: "已布置", title: "一次函数分层巩固", meta: "今天 10:32 · 初二 3 班", evidence: "学生端 18:00 开放 · 已保存完整版本记录", action: "查看试卷" },
  ],
};

function Resources({ saved, basket, navigate, notify }: { saved: string[]; basket: string[]; navigate: (target: Nav) => void; notify: (message: string) => void }) {
  const [tab, setTab] = useState("最近使用");
  const [promoted, setPromoted] = useState(false);
  const [repaired, setRepaired] = useState(false);
  const tabs = ["最近使用", "我的收藏", "我的试卷"];
  const items = resourceHistory[tab as keyof typeof resourceHistory];
  return <section className="content-page">
    <header className="page-header"><div><span className="page-kicker">每次使用，都在形成更懂你的题库</span><h1>我的资源</h1><p>用过、改过、验证过的内容，在这里持续沉淀。</p></div></header>
    <div className="asset-cards"><article><span>个人题库</span><b>2,846</b><small>本周新增 18 道 · 全部可追溯</small></article><article><span>晋级校本优质题</span><b>{promoted ? 128 : 127}</b><small>被校内复用 832 次</small></article><article><span>当前试卷</span><b>{basket.length}</b><small>道题等待完成组卷</small></article></div>
    <div className="resource-tabs">{tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}{item === "我的收藏" && ` ${saved.length}`}</button>)}</div>
    <div className="resource-list">{items.map((item, index) => <article key={item.title}><div className="resource-icon">{index + 1}</div><div><span>{item.type}</span><h3>{item.title}</h3><p>{item.meta}</p><small>{item.evidence}</small></div><button onClick={() => { if (item.action.includes("组卷") || item.action.includes("试卷")) navigate("试卷"); else if (item.action.includes("题目")) navigate("题目"); else notify(`已打开“${item.title}”的完整使用与修改记录`); }}>{item.action} →</button></article>)}</div>
    <div className="resource-content-card"><div><span>✦ Agent 本周建议</span><h3>{tab === "我的试卷" ? "把当前选题补成一份完整试卷" : "函数专题需要再补一次迁移练习"}</h3><p>{tab === "我的收藏" ? `你已收藏 ${saved.length} 份资源，Agent 可以按本周进度重新排序。` : "结合教学进度和最近作答，建议周四安排 20 分钟随堂练习。"}</p></div><button onClick={() => { if (tab === "我的试卷") navigate("试卷"); else { navigate("发现"); notify("已带入班级和进度，告诉 Agent 题量即可"); } }}>{tab === "我的试卷" ? "继续组卷 →" : "让 Agent 准备 →"}</button></div>
    <section className="asset-growth">
      <div className="growth-head"><div><span>资产如何持续变好</span><h2>使用验证后，优质内容逐级沉淀</h2></div><small>每一次采用、换题和纠错都会进入质量判断</small></div>
      <div className="growth-grid">
        <article className="promotion-flow"><div><span>个人资源</span><b>二次根式估值题</b><small>林老师使用 4 次</small></div><i>→</i><div><span>校本候选</span><b>8 位老师复用</b><small>正确率与区分度稳定</small></div><i>→</i><div className={promoted ? "done" : ""}><span>{promoted ? "已晋级" : "待确认"}</span><b>校本优质题</b><small>进入全校搜索与推荐</small></div><button onClick={() => { setPromoted(true); notify("已晋级为校本优质题，后续将根据真实使用持续复核"); }}>{promoted ? "已晋级 ✓" : "确认晋级"}</button></article>
        <article className="quality-card"><span>质量治理</span><h3>1 道题需要你确认</h3><p>学生反馈第 12 题条件表述可能产生歧义，Agent 已定位到原始试卷与两次修改记录。</p><div><b>{repaired ? "✓ 已纠正并保留旧版本" : "待处理 · 不再进入自动推荐"}</b><button onClick={() => { setRepaired(true); notify("已纠正题目并保留旧版本，推荐质量分已重新计算"); }}>{repaired ? "查看新版本" : "查看并纠正"}</button></div></article>
      </div>
    </section>
    <Footer />
  </section>;
}

function Footer() { return <footer className="site-footer">题库 Agent · 好题有来源，推荐有依据，结果可直接使用</footer>; }
