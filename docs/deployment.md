# Deployment / Launch Guide

This project can be launched publicly as a **live portfolio case-study site** plus a **GitHub repo**.

## Recommended launch setup

Use two public surfaces:

1. **GitHub repository**
   - for code, workflow JSON, and technical credibility
2. **Live static site with serverless demo endpoint**
   - for the public-facing case study page and interactive sample digest demo

## Important note about hosting choice

This project now includes a live demo endpoint at:
- `functions/api/demo-digest.js`

That means the best host is **Cloudflare Pages**, because it can serve:
- the static HTML page
- the `/api/demo-digest` function

## Best option: Cloudflare Pages

### Why this is the best fit
- serves the portfolio page
- supports the live demo API endpoint
- no traditional backend server required
- easy GitHub integration
- easy custom domain upgrade later

### How to deploy
1. Go to Cloudflare Pages
2. Create a new project
3. Connect the GitHub repo:
   - `gitrvc-hub/n8n-public-news-digest`
4. Build settings:
   - Framework preset: `None`
   - Build command: leave empty
   - Build output directory: `/`
5. Deploy

### Expected result
You will get a public URL from Cloudflare Pages.
That URL will serve:
- the public project page
- the live demo button
- the `/api/demo-digest` endpoint

## GitHub Pages note

GitHub Pages is still okay if you only want:
- the static case-study page
- no live interactive demo

But for **Option B** with a real public demo, GitHub Pages is not enough by itself because it does not run this function:
- `functions/api/demo-digest.js`

So:
- **GitHub Pages** = static version only
- **Cloudflare Pages** = live demo version

## Live demo behavior

The public page now includes a demo section where a visitor can:
- choose a scenario
- click **Generate sample digest**
- receive public-safe sample digest output from `/api/demo-digest`

This is intentionally safe:
- no secrets
- no real client data
- no real production systems

## If you want a real n8n-backed production demo later

The app now supports an **optional protected bridge** via environment variables:
- `N8N_BRIDGE_URL`
- `N8N_BRIDGE_TOKEN`

If those are set, the server will try the protected bridge first.
If the bridge is unavailable, it safely falls back to the built-in public demo response.

This lets you evolve the public portfolio app gradually:
- public-safe fallback by default
- protected n8n-backed behavior when ready

## Suggested launch structure

Use this pairing:
- **GitHub repo** = technical proof
- **Cloudflare Pages site** = live public case study + demo

## Suggested launch checklist

- [ ] repo description polished
- [ ] Cloudflare Pages project connected
- [ ] site deployed successfully
- [ ] live demo button returns results
- [ ] README links to live site
- [ ] portfolio site links to both repo and live case study

## Current public assets

Repo:
- `https://github.com/gitrvc-hub/n8n-public-news-digest`

Planned best live deployment target:
- Cloudflare Pages
