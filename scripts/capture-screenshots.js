const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const chromePath = fs.existsSync("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")
  ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  : "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

console.log("Using browser binary:", chromePath);

const outputDir = path.join(__dirname, "..", "screenshots");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function waitForServer(port, retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/`);
      if (res.ok) return true;
    } catch {
      // wait until Next.js listens
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function waitForCdpTarget(cdpPort, retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${cdpPort}/json/list`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find((item) => item.type === "page" && item.webSocketDebuggerUrl);
        if (page) return page;
      }
    } catch {
      // wait until Chrome CDP listens
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return null;
}

function createCdpClient(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let nextId = 1;
    const pending = new Map();

    ws.addEventListener("open", () => {
      resolve({
        send(method, params = {}) {
          const id = nextId++;
          return new Promise((res, rej) => {
            pending.set(id, { res, rej });
            ws.send(JSON.stringify({ id, method, params }));
          });
        },
        close() {
          ws.close();
        },
      });
    });

    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) rej(new Error(msg.error.message || JSON.stringify(msg.error)));
        else res(msg.result);
      }
    });

    ws.addEventListener("error", (err) => reject(err));
  });
}

async function main() {
  const PORT = 3457;
  const CDP_PORT = 9322;
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "ceylon-cdp-"));

  const nextBin = require.resolve("next/dist/bin/next");
  console.log(`Starting Next.js production server on port ${PORT}...`);
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT), "-H", "127.0.0.1"], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  server.stdout?.on("data", (d) => console.log(`[Next] ${d.toString().trim()}`));
  server.stderr?.on("data", (d) => console.error(`[Next Err] ${d.toString().trim()}`));

  let chrome;
  let cdp;

  try {
    const ready = await waitForServer(PORT);
    if (!ready) throw new Error("Next.js server did not become ready in time.");
    console.log("Next.js server is ready!");

    const routesToCheck = [
      "/",
      "/journey",
      "/day/2026-12-25",
      "/explore",
      "/places/seetha-amman-kovil",
      "/places/divurumpola",
      "/ravana-trail",
      "/map",
      "/essentials",
      "/saved",
      "/welcome",
    ];
    for (const route of routesToCheck) {
      const res = await fetch(`http://127.0.0.1:${PORT}${route}`);
      if (!res.ok) throw new Error(`Route ${route} returned HTTP ${res.status}`);
      console.log(`  HTTP ${res.status}: ${route}`);
    }

    chrome = spawn(
      chromePath,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        `--remote-debugging-port=${CDP_PORT}`,
        `--user-data-dir=${userDataDir}`,
        "about:blank",
      ],
      { stdio: "ignore" }
    );

    const target = await waitForCdpTarget(CDP_PORT);
    if (!target) throw new Error("Chrome DevTools target not available.");
    cdp = await createCdpClient(target.webSocketDebuggerUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    const targets = [
      { name: "mobile-today-360x800", path: "/", width: 360, height: 800, mobile: true },
      { name: "mobile-explore-360x800", path: "/explore", width: 360, height: 800, mobile: true },
      { name: "mobile-map-360x800", path: "/map", width: 360, height: 800, mobile: true },
      { name: "mobile-today-390x844", path: "/", width: 390, height: 844, mobile: true },
      { name: "mobile-journey-390x844", path: "/journey", width: 390, height: 844, mobile: true },
      { name: "mobile-ravana-trail-390x844", path: "/ravana-trail", width: 390, height: 844, mobile: true },
      { name: "mobile-place-seetha-390x844", path: "/places/seetha-amman-kovil", width: 390, height: 844, mobile: true },
      { name: "desktop-today-1440x900", path: "/", width: 1440, height: 900, mobile: false },
      { name: "desktop-journey-1440x900", path: "/journey", width: 1440, height: 900, mobile: false },
      { name: "desktop-explore-1440x900", path: "/explore", width: 1440, height: 900, mobile: false },
      { name: "desktop-ravana-trail-1440x900", path: "/ravana-trail", width: 1440, height: 900, mobile: false },
      { name: "desktop-place-seetha-1440x900", path: "/places/seetha-amman-kovil", width: 1440, height: 900, mobile: false },
      { name: "desktop-map-1440x900", path: "/map", width: 1440, height: 900, mobile: false },
      { name: "desktop-essentials-1440x900", path: "/essentials", width: 1440, height: 900, mobile: false },
      { name: "desktop-footer-1440x900", path: "/", width: 1440, height: 900, mobile: false, scrollBottom: true },
      { name: "mobile-footer-390x844", path: "/", width: 390, height: 844, mobile: true, scrollBottom: true },
    ];

    for (const t of targets) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: t.width,
        height: t.height,
        deviceScaleFactor: 1,
        mobile: t.mobile,
      });

      const url = `http://127.0.0.1:${PORT}${t.path}`;
      await cdp.send("Page.navigate", { url });
      await new Promise((r) => setTimeout(r, 900));

      if (t.scrollBottom) {
        await cdp.send("Runtime.evaluate", {
          expression: "window.scrollTo(0, document.body.scrollHeight);",
        });
        await new Promise((r) => setTimeout(r, 250));
      }

      // Wait for fonts + force-load any below-the-fold lazy Next/Image elements before auditing
      const audit = await cdp.send("Runtime.evaluate", {
        awaitPromise: true,
        returnByValue: true,
        expression: `(async () => {
          if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
          }
          const imgs = Array.from(document.querySelectorAll('img'));
          await Promise.all(
            imgs.map((img) => {
              img.loading = 'eager';
              if (img.complete && img.naturalWidth > 0) return Promise.resolve();
              return new Promise((resolve) => {
                const timer = setTimeout(resolve, 4000);
                img.addEventListener('load', () => { clearTimeout(timer); resolve(); }, { once: true });
                img.addEventListener('error', () => { clearTimeout(timer); resolve(); }, { once: true });
              });
            })
          );
          const brokenImgs = imgs
            .filter((img) => !img.complete || img.naturalWidth === 0)
            .map((img) => img.getAttribute('src') || img.src);
          return {
            innerWidth: window.innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            imgCount: imgs.length,
            brokenImgs
          };
        })()`,
      });

      const metrics = audit.result.value;
      console.log(
        `  Audited ${t.name}: viewport=${metrics.innerWidth}px, scrollWidth=${metrics.scrollWidth}px, imgs=${metrics.imgCount}, broken=${metrics.brokenImgs.length}`
      );
      if (metrics.scrollWidth > metrics.innerWidth) {
        throw new Error(
          `Horizontal overflow on ${t.name}: scrollWidth ${metrics.scrollWidth} > innerWidth ${metrics.innerWidth}`
        );
      }
      if (metrics.brokenImgs.length > 0) {
        throw new Error(`Broken images on ${t.name}: ${metrics.brokenImgs.join(", ")}`);
      }

      const shot = await cdp.send("Page.captureScreenshot", { format: "png" });
      const outFile = path.join(outputDir, `${t.name}.png`);
      fs.writeFileSync(outFile, Buffer.from(shot.data, "base64"));
      console.log(`  Saved: ${outFile}`);
    }

    console.log("All screenshots captured and DOM layout checks passed cleanly!");
  } finally {
    if (cdp) {
      try { cdp.close(); } catch {}
    }
    if (chrome) {
      try { chrome.kill("SIGTERM"); } catch {}
    }
    try { server.kill("SIGTERM"); } catch {}
    await new Promise((r) => setTimeout(r, 600));
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch {}
  }
}

main().catch((err) => {
  console.error("Error in capture script:", err);
  process.exit(1);
});
