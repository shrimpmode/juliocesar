# Julio Cesar — portfolio (Next.js)

My personal portfolio: Home, Skills and Contact, with hand-drawn [Rough.js](https://roughjs.com) boxes, GSAP entrance
animations and a blur page transition.

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm run lint
```

`npm run build` produces a fully static export in `out/` that any static
host can serve.

To serve it from a sub-path (for example a GitHub Pages project site at
`/juliocesar/`), set `BASE_PATH` at build time:

```bash
BASE_PATH=/juliocesar npm run build
```

## Deployment

Published to GitHub Pages at `/juliocesar/`. `.github/workflows/deploy.yml`
lints and builds every pull request; pushes to `main` also build with
`BASE_PATH=/juliocesar` and deploy `out/` to Pages. In the repository settings,
Pages → Source must be set to **GitHub Actions**.

## Structure

- `app/` — routes (`/`, `/skills`, `/contact`), root layout (font, nav, page
  transition) and `globals.css` (palette, link underline, transition CSS)
- `components/` — page content (client components with the GSAP timelines),
  `Nav`, `RoughBox`, `RoughArrow`, `RoughDoodle`, `SimpleIcon`
- `public/` — photo and `robots.txt`

## Notes

- **Page transition** uses React's `<ViewTransition>` (View Transitions API).
  Browsers without support switch pages instantly.
- **Skill icons** come from the `simple-icons` package and are bundled, so the
  site makes no requests to icon servers. Add a skill in
  `components/SkillsPage.tsx` by importing its `si*` icon.
- **Email** on the contact page is assembled in the browser only, so it is not
  in the pre-rendered HTML or as one string in the JS bundle.
- **GSAP and tilts:** GSAP sets `rotate: none` inline while animating, which
  overrides Tailwind 4's `rotate-*` utilities. Put a tilt on a wrapper element
  rather than on an element GSAP animates (see the sticky notes on Skills and Contact).
