# Deploying on Dokploy

This repo can run on Dokploy as a simple Node.js web app.

## Runtime model

The deployed app serves:
- the public portfolio page
- static repo assets
- a live demo endpoint at `/api/demo-digest`

It does this with:
- `server/index.js`
- `Dockerfile`

## Build type recommendation

Use Dokploy **Application** with:
- source: GitHub repo
- build type: `dockerfile`

## Required app settings

- Port: `3000`
- No external database required
- No secrets required for the current public-safe demo version

## Domain

Attach either:
- a generated Dokploy / Traefik domain
- or a custom domain later

## Notes

This is not yet a direct public-to-n8n production path.
It is a safe public demo runtime for portfolio use.

The server now supports an **optional protected bridge** using:
- `N8N_BRIDGE_URL`
- `N8N_BRIDGE_TOKEN`

That means you can keep the public-safe fallback while optionally routing requests through a protected backend that talks to n8n.
