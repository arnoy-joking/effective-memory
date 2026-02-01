export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send("No url");

  const r = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  });

  const body = await r.arrayBuffer();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(r.status).send(Buffer.from(body));
}
