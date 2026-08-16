# Pokémon Trading Card Game Pocket - Web Interview

A high-polish Next.js recreation inspired by the official Pokémon Trading Card Game Pocket website for the 2026 web game intern technical interview.

## Live Demo

```text
https://itshaoo.github.io/pokemon-tcg-pocket/
```

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Plain CSS
- GitHub Pages static export

## Features

- Responsive desktop and mobile layout
- Full-screen hero inspired by the official landing page
- App Store and Google Play call-to-action badges
- Card carousel with autoplay, arrows, dots, hover pause, and mobile swipe
- Immersive card tabs for Lightning, Fire, and Water themes
- Trailer preview modal with Escape and overlay close behavior
- Reduced motion toggle
- Mobile navigation menu
- News cards, game overview, newsletter demo form, and footer

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

The exported GitHub Pages-ready site is generated in `out/`.

## Deployment

This project is configured for GitHub Pages under:

```text
/pokemon-tcg-pocket/
```

The included GitHub Actions workflow builds the static export and deploys it to Pages when changes are pushed to `main`.

## AI Usage

### Tools

- ChatGPT / Codex

### How AI Helped

- Interpreted the assignment README and official reference website.
- Planned the page structure, visual direction, and interactive components.
- Generated the initial Next.js components, TypeScript data structures, and responsive CSS.
- Helped configure static export and GitHub Pages deployment.

### What I Changed

I selected the Pokémon TCG Pocket direction, chose a high-polish visual target, confirmed the interaction set, and guided decisions about official asset usage, GitHub Pages path, and README content. I reviewed the final behavior goals so the implementation matched the assignment requirements.

## Reflection

1. Which website did you choose?

   I chose Pokémon Trading Card Game Pocket.

2. Why did you choose it?

   I chose it because the site has a strong game-focused visual identity, clear mobile-first product storytelling, and natural opportunities for interactive card UI.

3. Which AI tools did you use?

   I used ChatGPT / Codex for planning, implementation, debugging, responsive design, and deployment setup.

4. What was the most challenging part?

   The most challenging part was balancing a close visual recreation with a manageable implementation scope, especially while keeping the interactions polished on both desktop and mobile.

5. What would you improve with one more day?

   I would add more detailed scroll-triggered animations, replace the modal preview with a fully embedded trailer experience, and further refine small responsive spacing details after device testing.

## Notes

This is a fan-made interview project inspired by the official Pokémon Trading Card Game Pocket website. Official assets are used only for this demo assignment.
