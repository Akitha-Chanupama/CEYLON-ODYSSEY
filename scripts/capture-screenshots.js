const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = fs.existsSync("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")
  ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  : "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

console.log("Using browser binary:", chromePath);

const outputDir = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function waitForServer(port, retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/`);
      if (res.ok) return true;
    } catch (e) {
      // wait
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

function runCommand(bin, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(bin, args, { stdio: 'inherit' });
    p.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command ${bin} exited with code ${code}`));
    });
  });
}

async function main() {
  const PORT = 3456;
  console.log(`Starting Next.js server on port ${PORT}...`);
  const server = spawn('npm.cmd', ['run', 'start', '--', '-p', String(PORT), '-H', '127.0.0.1'], {
    shell: true,
  });

  server.stdout?.on('data', (d) => console.log(`[Next] ${d.toString().trim()}`));
  server.stderr?.on('data', (d) => console.error(`[Next Err] ${d.toString().trim()}`));

  const ready = await waitForServer(PORT);
  if (!ready) {
    console.error("Server did not become ready in time.");
    server.kill();
    process.exit(1);
  }
  console.log("Next.js server is ready!");

  const targets = [
    { name: 'mobile-today-390x844', path: '/', width: 390, height: 844 },
    { name: 'mobile-journey-390x844', path: '/journey', width: 390, height: 844 },
    { name: 'mobile-ravana-trail-390x844', path: '/ravana-trail', width: 390, height: 844 },
    { name: 'mobile-place-seetha-390x844', path: '/places/seetha-amman-kovil', width: 390, height: 844 },
    { name: 'desktop-today-1440x900', path: '/', width: 1440, height: 900 },
    { name: 'desktop-journey-1440x900', path: '/journey', width: 1440, height: 900 },
    { name: 'desktop-ravana-trail-1440x900', path: '/ravana-trail', width: 1440, height: 900 },
    { name: 'desktop-place-seetha-1440x900', path: '/places/seetha-amman-kovil', width: 1440, height: 900 },
  ];

  for (const t of targets) {
    const outFile = path.join(outputDir, `${t.name}.png`);
    const url = `http://127.0.0.1:${PORT}${t.path}`;
    console.log(`Capturing ${t.name} (${t.width}x${t.height}) from ${url}...`);
    try {
      await runCommand(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        `--window-size=${t.width},${t.height}`,
        `--screenshot=${outFile}`,
        url,
      ]);
      console.log(`  Saved: ${outFile}`);
    } catch (err) {
      console.error(`  Failed capturing ${t.name}:`, err.message);
    }
  }

  console.log("Closing Next.js server...");
  server.kill();
  console.log("All screenshots captured successfully!");
}

main().catch((err) => {
  console.error("Error in capture script:", err);
  process.exit(1);
});
