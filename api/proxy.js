export default async function handler(req, res) {
  if (!["GET", "POST", "OPTIONS"].includes(req.method)) {
    return res.status(405).end();
  }

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    return res.status(200).end();
  }

  const url = req.query.url;
  if (!url) return res.status(400).send("No url");

  const r = await fetch(url, {
    method: req.method,
    headers: {
      "user-agent": req.headers["user-agent"] || "Mozilla/5.0",
      "content-type": req.headers["content-type"] || "application/json",
    },
    body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
  });

  const data = await r.arrayBuffer();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(r.status).send(Buffer.from(data));
}
