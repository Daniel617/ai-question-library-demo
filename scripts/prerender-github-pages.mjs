import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const outputDir = new URL("../site/", import.meta.url);
const clientDir = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages", `${Date.now()}`);

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Unable to prerender homepage: ${response.status}`);

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "ai-question-library-demo";
const base = `/${repository}/`;
const html = (await response.text())
  .replaceAll('href="/assets/', `href="${base}assets/`)
  .replaceAll('src="/assets/', `src="${base}assets/`)
  .replaceAll('import("/assets/', `import("${base}assets/`)
  .replaceAll('url(/assets/', `url(${base}assets/`)
  .replaceAll('href="/favicon.svg"', `href="${base}favicon.svg"`)
  .replaceAll('href="/file.svg"', `href="${base}file.svg"`)
  .replaceAll('href="/globe.svg"', `href="${base}globe.svg"`)
  .replaceAll('href="/window.svg"', `href="${base}window.svg"`);

await writeFile(new URL("index.html", outputDir), html);
await writeFile(new URL(".nojekyll", outputDir), "");
