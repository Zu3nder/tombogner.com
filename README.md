# tombogner.com

Static personal portfolio site for **Tom Bogner** (Product Design & Brand Direction), migrated from the Framer site at [tombogner.com](https://www.tombogner.com/).

## Preview locally

Any static file server works. From the repo root:

```bash
# Python
python3 -m http.server 8080

# Node (if you have npx)
npx --yes serve -p 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## GitHub Pages

This project is set up for **GitHub Pages from the repository root** (`index.html` at `/`).

Pages is not enabled yet — after merging, enable it in the repo settings:

1. **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / root (`/`)

A `.nojekyll` file is included so GitHub Pages serves assets as-is.

## Structure

```
index.html                 Homepage
css/styles.css             Styles
js/main.js                 Berlin clock, video hover controls, reveals
assets/                    Favicons, OG image, logos, homepage showreel
assets/case-studies/       Self-hosted case study images & videos
pitch/                     Pitch case study
microsoft/                 Microsoft case study
app-basics/                Wunderlist case study
sqior/                     sqior case study
motion-explorations/       Explorations + Motion
presentation/              Empty placeholder (matches live)
```

Case study media is self-hosted. Larger Framer source videos were compressed (H.264, ≤1280px wide) to keep the repo lean for GitHub Pages; no media was left hotlinked.