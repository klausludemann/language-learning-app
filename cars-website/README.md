# The Three Greatest Cars

A single-page site making the case for the Ferrari 250 GTO, the McLaren F1 and the
Porsche 911, with illustrations, specifications, a comparison table and embedded video.

## Running it

It is one self-contained file with no build step and no dependencies:

```
open cars-website/index.html
```

Any static host will serve it as-is. Note that the videos are YouTube embeds, so the
page needs an internet connection to show them — everything else works offline.

## What's in it

- `index.html` — the whole site: markup, CSS and the illustrations, all inline.

## Notes on the media

- **Images.** The three car illustrations and the nine detail graphics are original
  inline SVG drawn for this page. The side elevations are drawn to each car's real
  dimensions (length, wheelbase, height, wheel diameter and overhangs to scale), in a
  flat editorial style rather than as photographs. Nothing is copied from another
  source, so there is no licence or attribution to track.
- **Videos.** Embedded from YouTube via `youtube-nocookie.com` and owned by their
  respective creators. If a video is ever taken down its panel will go blank; the
  links under each player point at alternatives.
- Swapping an illustration for a photograph is a drop-in change: replace the `<svg>`
  inside the relevant `.stage` element with an `<img>`. Photographs of all three cars
  are on Wikimedia Commons under free licences (linked in the page footer) and need
  their photographer credited if used.

## Relationship to the rest of this repository

This folder is standalone and independent of the Spanish learning app at the
repository root. It is not part of that app's Vite build and is not deployed by
`firebase deploy`, which publishes `dist/`.
