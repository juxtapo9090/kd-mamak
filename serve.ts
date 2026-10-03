// Static server for the stall. Run: bun serve.ts  → http://localhost:8765
const PORT = Number(process.env.PORT ?? 8765);
Bun.serve({
  port: PORT,
  async fetch(req) {
    let p = new URL(req.url).pathname;
    if (p === "/") p = "/index.html";
    const f = Bun.file(import.meta.dir + p);
    return (await f.exists()) ? new Response(f) : new Response("404 — tak jumpa, boss", { status: 404 });
  },
});
console.log(`Restoran Kracked Maju buka di http://localhost:${PORT}`);
