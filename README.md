# Public News Digest for n8n

![Social preview](assets/social-preview.svg)

A public-demo-safe portfolio project that watches public feeds, filters noise, summarizes important updates with AI, and delivers a clean daily digest to Telegram, Slack, or email.

## Portfolio summary

**What it is**
A reusable n8n workflow template for turning public information sources into a useful daily briefing.

**Who it is for**
- founders
- operators
- agencies
- researchers
- content teams
- people who want fewer tabs and better signals

**Why it belongs in a portfolio**
- uses only public or mock data
- easy to explain in one sentence
- combines orchestration + AI + delivery
- visually demoable
- adaptable across industries

## Public-facing parts

This project has 2 public-facing assets:

- `app/index.html`
  - a polished portfolio/demo page
- `workflow/public-news-digest-workflow.json`
  - the reusable workflow template people can import into n8n

The backend credentials and delivery channels stay private. The demo story stays public.

## Included files

- `README.md` — overview, setup, and portfolio framing
- `app/index.html` — public-facing project page
- `workflow/public-news-digest-workflow.json` — importable n8n workflow template
- `sample-data/feed-items.json` — public-safe mock data
- `docs/demo-script.md` — Loom/demo walkthrough script
- `CONTRIBUTING.md` — contribution guide
- `CHANGELOG.md` — version history
- `LICENSE` — MIT license
- `.gitignore` — ignore local-only files and secrets

## Workflow summary

1. Scheduled trigger runs every morning
2. Pulls items from public RSS feeds or APIs
3. Normalizes titles, dates, and sources
4. Filters empty or low-signal items
5. Scores item relevance using simple rules
6. Uses AI to summarize each selected item
7. Formats a clean daily digest
8. Sends it to Telegram / Slack / email
9. Can optionally store a copy in Notion / Sheets / Airtable

## Example use cases

- AI tools / model release digest
- real estate market updates
- marketing / SEO change digest
- open-source release roundup
- docs change radar for public product docs

## Demo story

Use this positioning line in your portfolio:

> Built an automated daily digest workflow in n8n that monitors public sources, filters noise, summarizes relevant updates, and sends a clean briefing to a delivery channel of choice.

## Quickstart

1. Import `workflow/public-news-digest-workflow.json` into n8n
2. Replace placeholder feed URLs with real public feeds
3. Connect your AI and delivery credentials
4. Test with `sample-data/feed-items.json` or live feeds
5. Customize scoring logic and delivery format for your niche

## Safe public demo rules

To keep this portfolio-safe:
- use public feeds only
- use mock data when recording demos
- never commit credentials
- never include private client feeds or internal URLs
- keep screenshots and sample output sanitized

## Suggested GitHub presentation

When publishing this repo, keep the message simple:

- **Problem:** there is too much noise across news and update sources
- **Solution:** one workflow turns scattered updates into a structured digest
- **Value:** less research time, better awareness, reusable automation pattern

## Suggested screenshots / assets

Recommended repo assets:
- screenshot of `app/index.html`
- screenshot of the n8n canvas after importing the workflow
- screenshot of sample digest output in Telegram or Slack
- short Loom walkthrough using the script in `docs/demo-script.md`

## Future improvements

- add a Slack version and email version
- add a Notion database sink
- add topic-specific weighting
- add duplicate detection by URL hash
- add a human approval step before delivery
- add multiple portfolio variants by industry

## License

MIT
