# Birthday Collage

An archived, single-page birthday collage built with plain HTML, CSS, and
JavaScript.

The page arranges eight photographs around a central birthday message, then
adds an animated entrance, pointer-responsive lighting, fullscreen viewing,
and a keyboard-accessible image lightbox. Reduced-motion preferences are
respected.

## Run locally

No build step is required. Open `index.html` in a browser, or serve the folder
with any static file server.

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000`.

## Customize

- Replace the files under [`img`](img) with the photographs you want to show.
- Update the `memories` array in [`main.js`](main.js) when filenames change.
- Edit the message and page title in [`index.html`](index.html).
- Adjust layout, color, and motion in [`style.css`](style.css).

## Repository status

This was built for one personal occasion and is archived. It remains useful as
a small reference for a responsive photo composition without a framework.
