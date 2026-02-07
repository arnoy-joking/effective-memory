import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // 1. Handle CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Handle Preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Missing URL parameter");
  }

  // 2. Setup the Proxy Agent
  const proxyUrl = 'http://kiiuqioq:kossz8s8m335@31.59.20.176:6754';
  const agent = new HttpsProxyAgent(proxyUrl);

  try {
    // 3. Perform the request through the proxy
    const response = await fetch(targetUrl, {
      method: req.method,
      agent: agent,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });

    const contentType = response.headers.get('content-type');
    const data = await response.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    return res.status(response.status).send(Buffer.from(data));

  } catch (e) {
    return res.status(500).send("Proxy Error: " + e.message);
  }
}
