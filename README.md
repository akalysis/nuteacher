# Andrew Kingston Research and Teaching Repository

This repository contains the source code for Andrew Kingston's research and teaching repository: a Next.js site for applied health research, ageing, survey methods, statistical practice, software notes, and reusable teaching material.

## Overview

The site is designed as a broad professional knowledge base rather than a single-topic course. It features:
- Four public entry points: Methods, Research, Teaching, and Blog.
- A professional academic visual system with a light editorial base and restrained accent colours.
- A Remotion-powered homepage title treatment mounted as a client-side island.
- Support for MDX, allowing Markdown content to sit alongside React components.
- A structured questionnaire design module generated from maintained source material.

## Development
To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture
- Framework: [Next.js](https://nextjs.org) (App Router)
- Language: TypeScript
- Styling: Custom Vanilla CSS (no Tailwind) to ensure maximum flexibility and aesthetic control.
- Motion: [Remotion](https://www.remotion.dev/) via `@remotion/player` for React-driven title animation.

## Remotion note
The homepage uses Remotion Player for the animated title. Remotion has licensing requirements for some company or institutional uses; confirm the licence fit before wider organisational deployment.

---
*Created and designed for Andrew Kingston PhD.*
