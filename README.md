# Slidev Multideck

A multi-presentation [Slidev](https://sli.dev) template that allows you to maintain a shared library of reusable slides, components, and assets across multiple presentations.

## Use This Template

1. Click **"Use this template"** on GitHub (or clone this repo)
2. Run `pnpm install`
3. Run `pnpm run dev getting-started` to see the tutorial presentation
4. Create your own presentations in `presentations/`

## Features

- **Reusable Slide Library** - Create slides once, use them in multiple presentations
- **Multiple Entry Points** - Each presentation has its own `slides.md` that can mix includes and custom content
- **Shared Resources** - Components, layouts, styles, and assets are shared across all presentations
- **WCAG 2.2 AA Theme** - Custom accessible theme with proper contrast ratios and focus states
- **Flexible Visibility** - Control which presentations appear on the public landing page
- **Single & Batch Builds** - Build one presentation for development or all at once for deployment
- **GitHub Pages Ready** - Includes workflow for automatic deployment

## Quick Start

```bash
# Install dependencies
pnpm install

# List available presentations
pnpm run list

# Start dev server
pnpm run dev getting-started

# Create your first presentation
mkdir presentations/my-talk
# Then create presentations/my-talk/slides.md
```

## Project Structure

```
slidev-multideck/
├── presentations/         # Your presentations go here
│   └── getting-started/   # Example tutorial presentation
│       └── slides.md
├── slides/                # Shared/reusable slides
│   ├── intro/             # Introduction slides
│   │   ├── title.md
│   │   ├── about-me.md
│   │   └── agenda.md
│   └── closing/           # Closing slides
│       ├── questions.md
│       └── thank-you.md
├── theme/                 # Custom WCAG 2.2 AA theme
│   ├── layouts/           # 19 theme layouts
│   ├── styles/            # Theme styles (customize colors here)
│   └── README.md          # Theme documentation
├── components/            # Shared Vue components
├── public/                # Shared static assets
├── styles/                # Additional shared CSS styles
├── landing/
│   └── config.json        # Landing page configuration
├── scripts/
│   ├── build.js           # Build orchestrator
│   └── generate-landing.js
└── .github/workflows/
    └── deploy.yml         # GitHub Pages deployment
```

## Creating a New Presentation

1. Create a new directory under `presentations/`:

```bash
mkdir presentations/my-new-talk
```

2. Create `slides.md` with frontmatter and content:

```md
---
theme: ../../theme
title: My New Talk
description: A brief description for the landing page
date: 2025-01-20
tags: [tag1, tag2]
listed: true
transition: slide-left
layout: cover
---

# Welcome

This is the first slide.

---
src: ../../slides/intro/about-me.md
---

---

# Custom Content

Mix library slides with custom content.

---
src: ../../slides/closing/questions.md
---
```

## Presentation Frontmatter Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | folder name | Presentation title |
| `description` | string | - | Description shown on landing page |
| `date` | string | - | Date (YYYY-MM-DD), used for sorting |
| `tags` | array | [] | Tags shown on landing page |
| `listed` | boolean | true | Whether to show on landing page |
| `theme` | string | default | Slidev theme to use |
| `transition` | string | - | Slide transition effect |

Plus all standard [Slidev frontmatter options](https://sli.dev/custom/#frontmatter-configures).

## Including Slides from the Library

Use the `src` frontmatter to include slides from the library:

```md
---
src: ../../slides/intro/about-me.md
---
```

Each library slide file can contain:
- A single slide
- Multiple slides (separated by `---`)
- Its own frontmatter for layout, transitions, etc.

## Shared Components

Components in the `components/` directory are available in all presentations:

### Speaker Component

```vue
<Speaker
  name="Jane Doe"
  role="Developer"
  :social="[
    { platform: 'GitHub', url: 'https://github.com/janedoe' }
  ]"
/>
```

### KeyPoints Component

```vue
<KeyPoints
  title="Key Takeaways"
  :points="['Point one', 'Point two', 'Point three']"
/>
```

## Theme

The project includes a custom WCAG 2.2 AA compliant theme with 19 layouts.

### Using the Theme

Reference the theme in your presentation's frontmatter:

```md
---
theme: ../../theme
layout: cover
---
```

### Customizing Colors

Edit `theme/styles/index.css` to customize your brand colors:

```css
:root {
  --color-primary: #2563eb;      /* Main brand color */
  --color-primary-dark: #1d4ed8; /* Darker variant */
  --color-text-heading: #1e40af; /* Heading color */
  --color-link: #2563eb;         /* Link color */
}
```

### Adding a Logo

1. Place your logo in `public/` (e.g., `logo.png` or `logo.svg`)
2. Enable it on slides:

```md
---
layout: cover
logo: true           # Uses default /logo.png
# or
logo: /my-logo.svg   # Custom path
---
```

### Available Layouts

| Layout | Description |
|--------|-------------|
| `default` | Standard content slide |
| `cover` | Title slide with gradient bar |
| `center` | Centered content |
| `intro` | Introduction slide |
| `section` | Section divider |
| `two-cols` | Two equal columns |
| `two-cols-header` | Header + two columns + footer |
| `image-right` | Content left, image right |
| `image-left` | Image left, content right |
| `image` | Full-bleed background image |
| `quote` | Styled quote with attribution |
| `fact` | Large centered fact/number |
| `statement` | Bold centered statement |
| `iframe` | Embedded web page |
| `iframe-left` / `iframe-right` | Iframe + content |
| `full` | Full bleed, no padding |
| `end` | Closing slide |
| `none` | No styling |

See `theme/README.md` for detailed layout documentation.

## Landing Page

Edit `landing/config.json` to customize:

```json
{
  "title": "My Presentations",
  "description": "A collection of talks and workshops.",
  "author": "Your Name",
  "links": [
    { "label": "GitHub", "url": "https://github.com/yourusername" }
  ]
}
```

## Deployment

### GitHub Pages

The included workflow automatically builds and deploys on push to `main`.

To enable:
1. Push to GitHub
2. Go to Settings > Pages
3. Set Source to "GitHub Actions"

### Manual Deployment

```bash
pnpm run build:all
```

Deploy the `dist/` folder to any static hosting.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm run list` | List all presentations |
| `pnpm run dev <name>` | Start dev server |
| `pnpm run build <name>` | Build single presentation |
| `pnpm run build:all` | Build all + landing page |
| `pnpm run export <name>` | Export to PDF |

## Customization Checklist

When you start using this template:

- [ ] Update `landing/config.json` with your info
- [ ] Update `slides/intro/about-me.md` with your details
- [ ] Customize theme colors in `theme/styles/index.css`
- [ ] Add your logo to `public/logo.png` (optional)
- [ ] Create your first presentation in `presentations/`

## Resources

- [Slidev Documentation](https://sli.dev)
- [Slidev GitHub](https://github.com/slidevjs/slidev)
- [Theme Documentation](./theme/README.md)

## License

MIT
