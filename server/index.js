import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = normalize(join(__filename, '..'));
const rootDir = normalize(join(__dirname, '..'));
const appDir = join(rootDir, 'app');
const assetsDir = join(rootDir, 'assets');
const docsDir = join(rootDir, 'docs');
const workflowDir = join(rootDir, 'workflow');
const sampleDataDir = join(rootDir, 'sample-data');
const port = Number(process.env.PORT || 3000);
const n8nBridgeUrl = process.env.N8N_BRIDGE_URL || '';
const n8nBridgeToken = process.env.N8N_BRIDGE_TOKEN || '';

const library = {
  automation: {
    heading: 'Automation and workflow signals',
    items: [
      {
        source: 'Open Workflow Weekly',
        score: 8,
        title: 'Open-source workflow tool adds new AI evaluation nodes',
        summary: 'A workflow platform introduced evaluation and guardrail nodes for AI automations. This matters because it makes production AI workflows easier to measure, tune, and harden.',
        link: 'https://example.com/open-source-workflow-ai-eval'
      },
      {
        source: 'Ops Stack Journal',
        score: 7,
        title: 'Major CRM platform launches faster lead routing automations',
        summary: 'The update focuses on reducing time-to-contact for inbound leads with smarter routing logic. Teams running high-volume intake workflows could use this to improve response speed and conversion.',
        link: 'https://example.com/crm-lead-routing-update'
      },
      {
        source: 'Maker Dispatch',
        score: 6,
        title: 'New public API makes content syndication easier for small teams',
        summary: 'A lightweight API now supports simpler content redistribution and event-based publishing. It opens up cleaner workflow options for repurposing pipelines and multi-channel content operations.',
        link: 'https://example.com/content-syndication-api'
      }
    ]
  },
  realestate: {
    heading: 'Real estate market update signals',
    items: [
      {
        source: 'Housing Pulse',
        score: 8,
        title: 'Regional listing activity rises ahead of peak summer demand',
        summary: 'A pickup in listing activity can change how agents plan outreach and pricing conversations. This type of digest helps operators spot momentum shifts early.',
        link: 'https://example.com/regional-listing-activity'
      },
      {
        source: 'Mortgage Monitor',
        score: 7,
        title: 'Rate volatility pushes more buyers toward shorter decision cycles',
        summary: 'Even small rate movements can shift urgency for active buyers. Teams can use daily digests like this to align messaging and timing.',
        link: 'https://example.com/mortgage-volatility-buyers'
      },
      {
        source: 'Local Market Brief',
        score: 6,
        title: 'Inventory pressure remains uneven across suburban markets',
        summary: 'Submarket-level inventory changes affect agent strategy more than national headlines. A filtered digest helps surface the updates that actually matter operationally.',
        link: 'https://example.com/suburban-inventory-pressure'
      }
    ]
  },
  marketing: {
    heading: 'Marketing and SEO change signals',
    items: [
      {
        source: 'Search Update Watch',
        score: 8,
        title: 'Documentation update clarifies structured data recommendations',
        summary: 'Clearer documentation can affect publishing workflows, internal checklists, and optimization priorities. A digest helps teams respond without constantly watching multiple sources.',
        link: 'https://example.com/structured-data-update'
      },
      {
        source: 'Content Ops Bulletin',
        score: 7,
        title: 'Teams shift toward multi-format repurposing for new campaigns',
        summary: 'The operational takeaway is not the trend itself, but how content systems need to support more reuse across channels. That is exactly the kind of signal a digest workflow should highlight.',
        link: 'https://example.com/multi-format-repurposing'
      },
      {
        source: 'Growth Notes',
        score: 6,
        title: 'Smaller brands adopt lighter-weight analytics stacks',
        summary: 'This points to demand for simpler reporting and automation patterns. A curated digest can help teams notice where tooling expectations are moving.',
        link: 'https://example.com/lighter-analytics-stacks'
      }
    ]
  }
};

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

function safeJoin(base, requestedPath) {
  const full = normalize(join(base, requestedPath));
  return full.startsWith(base) ? full : null;
}

async function serveFile(res, filePath) {
  const ext = extname(filePath).toLowerCase();
  const type = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type });
  createReadStream(filePath).pipe(res);
}

async function handleApiDemoDigest(req, res) {
  try {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    const body = raw ? JSON.parse(raw) : {};
    const topic = String(body.topic || 'automation').trim().toLowerCase();
    const selected = library[topic] || library.automation;

    if (n8nBridgeUrl) {
      try {
        const bridgeResponse = await fetch(n8nBridgeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(n8nBridgeToken ? { Authorization: `Bearer ${n8nBridgeToken}` } : {})
          },
          body: JSON.stringify({ topic })
        });

        if (bridgeResponse.ok) {
          const bridgePayload = await bridgeResponse.json();
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            ok: true,
            topic,
            heading: bridgePayload.heading || selected.heading,
            generatedAt: bridgePayload.generatedAt || new Date().toISOString(),
            items: bridgePayload.items || selected.items,
            notes: [
              'This response was served through the optional protected n8n bridge.',
              ...((bridgePayload.notes || []).slice(0, 2))
            ]
          }));
          return;
        }
      } catch {
        // Fall back to the safe built-in demo payload below.
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      ok: true,
      topic,
      heading: selected.heading,
      generatedAt: new Date().toISOString(),
      items: selected.items,
      notes: [
        'This is a public-safe live demo response.',
        n8nBridgeUrl
          ? 'The protected n8n bridge was unavailable, so the built-in fallback demo response was used.'
          : 'In production, this endpoint could be replaced with a real orchestration layer that triggers n8n or returns persisted digest output.'
      ]
    }));
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'Unable to generate demo digest output.' }));
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/api/demo-digest') {
    return handleApiDemoDigest(req, res);
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method not allowed');
    return;
  }

  let filePath = null;

  if (url.pathname === '/' || url.pathname === '/index.html') {
    filePath = join(rootDir, 'index.html');
  } else if (url.pathname === '/app' || url.pathname === '/app/') {
    filePath = join(appDir, 'index.html');
  } else if (url.pathname.startsWith('/app/')) {
    filePath = safeJoin(appDir, url.pathname.replace(/^\/app\//, ''));
  } else if (url.pathname.startsWith('/assets/')) {
    filePath = safeJoin(assetsDir, url.pathname.replace(/^\/assets\//, ''));
  } else if (url.pathname.startsWith('/docs/')) {
    filePath = safeJoin(docsDir, url.pathname.replace(/^\/docs\//, ''));
  } else if (url.pathname.startsWith('/workflow/')) {
    filePath = safeJoin(workflowDir, url.pathname.replace(/^\/workflow\//, ''));
  } else if (url.pathname.startsWith('/sample-data/')) {
    filePath = safeJoin(sampleDataDir, url.pathname.replace(/^\/sample-data\//, ''));
  }

  if (!filePath || !existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  if (req.method === 'HEAD') {
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end();
    return;
  }

  return serveFile(res, filePath);
});

server.listen(port, () => {
  console.log(`public-news-digest listening on http://0.0.0.0:${port}`);
});
