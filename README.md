# PortfoliobyAditi

A playful, draggable canvas where my portfolio refuses to sit still.

## Key Features

- Infinite dot-grid canvas with drag-to-explore interaction
- Central hero block with sticker characters and themed cards
- Stacked Projects and Blogging cards with hover fan-out
- Profile and contact cards styled to match the playful palette

## Tech Stack

- Next.js (App Router)
- React 18
- Framer Motion
- Tailwind CSS
- Next/Image

## Performance Optimizations

- WebP assets at max 600px width for faster downloads and first paint
- GPU world transform using translate3d + will-change for smoother drag
- Static dot grid to avoid full repaint on every pointer move
- rAF-throttled pointer updates to reduce main-thread work

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open http://localhost:3000


