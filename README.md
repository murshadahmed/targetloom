# TargetLoom

Agentic AI for Drug-Target Discovery — live gene/drug lookup, structure viewer,
interaction network, survival analysis, and evidence table, backed by public
bioinformatics APIs.

## Why this version is different from a single dropped HTML file

Two of the data sources this site uses — **Open Targets** and **cBioPortal** —
block direct browser-to-API calls (CORS). Two small serverless functions
(`netlify/functions/opentargets.js` and `netlify/functions/cbioportal.js`)
sit between the site and those APIs to work around this. That means this
site needs to be deployed in a way that includes functions — a plain
drag-and-drop of `index.html` alone to Netlify will NOT run the functions,
and the network/survival/evidence panels will keep failing.

## Deploy (free) — GitHub + Netlify

1. Create a new GitHub repo and push these three items exactly as they are:
   - `index.html`
   - `netlify.toml`
   - `netlify/functions/opentargets.js`
   - `netlify/functions/cbioportal.js`
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** →
   **Import an existing project** → connect the GitHub repo.
3. Netlify auto-detects `netlify.toml`, which points it at the functions
   folder. Leave build command empty (there's no build step) — click **Deploy**.
4. Your site goes live at `https://<your-site-name>.netlify.app`, and the
   functions live at `https://<your-site-name>.netlify.app/.netlify/functions/...`
   automatically — no extra config needed.

## Deploy (free) — Netlify CLI, if you don't want to use GitHub yet

```bash
npm install -g netlify-cli
cd targetloom-site
netlify deploy --prod
```

## Extending this later

These same two functions are the natural place to also host your Tier 1/Tier 2
AI prediction endpoints (see `runAIPrediction()` in `index.html`, and the
architecture doc) — add a `netlify/functions/predict.js` alongside these when
you're ready to wire that in.
