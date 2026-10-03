// Snapshot KD's public API into data/*.json — their API sends no CORS to foreign origins,
// so the page reads these files instead. Run: bun snapshot.ts  (cron / GH Actions later)
const BASE = "https://krackeddevs.com/api/";
const EPS = ["events", "leaderboard", "leaderboard/top-hunters", "leaderboard/active-contributors"];
let failed = 0;
for (const ep of EPS) {
  const res = await fetch(BASE + ep, { headers: { "User-Agent": "kd-mamak-snapshot" } });
  if (!res.ok) { console.error(`FAIL ${ep}: HTTP ${res.status}`); failed++; continue; }
  const body = await res.json();
  await Bun.write(`data/${ep.replaceAll("/", "-")}.json`, JSON.stringify({ snapshot_at: new Date().toISOString(), ...body }));
  console.log(`ok ${ep}`);
}
if (failed) process.exit(1);
