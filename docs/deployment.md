# Deployment / Launch Guide

This project can be launched publicly as a **static portfolio case-study site** plus a **GitHub repo**.

## Recommended launch setup

Use two public surfaces:

1. **GitHub repository**
   - for code, workflow JSON, and technical credibility
2. **Static site**
   - for the public-facing case study page recruiters and clients can visit directly

## Easiest option: GitHub Pages

This repo is now structured to support a simple static deployment.

### Why it works
- `index.html` exists at repo root
- it redirects to `app/index.html`
- no backend is required for the public-facing page
- fast and free

### Steps
1. Go to the repo:
   - `https://github.com/gitrvc-hub/n8n-public-news-digest`
2. Open:
   - **Settings** → **Pages**
3. Under **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Save
5. Wait for GitHub Pages to publish

### Expected result
Your site should become available at something like:
- `https://gitrvc-hub.github.io/n8n-public-news-digest/`

That URL will redirect visitors into the portfolio page automatically.

## Alternate options

### Cloudflare Pages
Good if you want:
- faster global CDN
- custom domain later
- cleaner portfolio URL

Basic approach:
- import the GitHub repo into Cloudflare Pages
- framework preset: none / static
- build command: none
- output directory: `/`

### Netlify
Also easy for static launch:
- connect repo
- build command: none
- publish directory: `/`

## Best public launch structure

Use this pairing:

- **GitHub repo:** technical proof + workflow files
- **Live page:** polished portfolio presentation

Example:
- GitHub repo link on portfolio
- Live site link as “View case study” or “Live project page”

## Recommended portfolio wording

Use links like:
- **Case Study**
- **Live Project Page**
- **GitHub Repo**
- **Workflow Template**

Avoid calling it just:
- “demo”

because this is stronger than a casual demo — it is a portfolio case study.

## What to add before launch for a stronger presentation

Optional but recommended:
- screenshot of the n8n canvas
- screenshot of digest output in Telegram/Slack
- Loom walkthrough
- project thumbnail in your main portfolio site

## Suggested launch checklist

- [ ] GitHub repo description is polished
- [ ] GitHub Pages is enabled
- [ ] README is portfolio-facing
- [ ] public page opens correctly
- [ ] screenshot assets added later if desired
- [ ] portfolio site links to both live page and GitHub repo

## Current public assets

Repo:
- `https://github.com/gitrvc-hub/n8n-public-news-digest`

Planned live site after Pages is enabled:
- `https://gitrvc-hub.github.io/n8n-public-news-digest/`
