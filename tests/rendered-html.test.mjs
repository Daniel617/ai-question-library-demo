import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the 题库 Agent product shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>题库 Agent｜说需求，拿结果<\/title>/);
  assert.match(html, /说出教学目标，AI 帮你找题、组卷、组练习、改编和命题/);
  assert.match(html, /本周.*热门题单/);
  assert.match(html, /跟着当前教材进度找/);
  assert.match(html, /AI 已读懂你的备课上下文/);
  assert.match(html, /区域题库/);
  assert.match(html, /校本题库/);
  assert.match(html, /题库 Agent 教学需求输入/);
  assert.match(html, /我的资源/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps strategy-critical content and interactions in the product source", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(page, /taskTitleFromRequest/);
  assert.match(page, /需求兑现/);
  assert.match(page, /本次新学习/);
  assert.match(page, /质量治理/);
  assert.match(page, /确认晋级/);
  assert.match(page, /paperContents/);
  assert.match(page, /题库 Agent 智能组卷/);
  assert.match(page, /resourceTab/);
  assert.match(page, /东西海朝期末真题圈/);
  assert.match(page, /深圳强区期末真题圈/);
  assert.match(page, /平谷阶段检测真题圈/);
  assert.match(page, /district-switch/);
  assert.match(page, /browse-workbench/);
  assert.match(page, /textbook-explorer/);
  assert.doesNotMatch(page, /先用 q1 检查概念/);
  assert.match(css, /\.requirement-strip/);
  assert.match(css, /\.asset-growth/);
  assert.match(css, /\.resource-finder select/);
  assert.match(css, /\.bottom-composer/);
});
