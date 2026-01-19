---
theme: ../../theme
title: Getting Started with Slidev Multideck
description: Learn how to use this multi-presentation template
date: 2025-01-01
tags: [tutorial, slidev, template]
listed: true
transition: slide-left
mdc: true
layout: cover
subtitle: A Multi-Presentation Template
---

# Getting Started

How to use this template for your presentations

---
layout: center
---

# What You'll Learn

<KeyPoints
  :points="[
    'Project structure overview',
    'Creating your first presentation',
    'Using shared slides and components',
    'Customizing the theme',
    'Building and deploying'
  ]"
/>

---

# Project Structure

```
slidev-multideck/
├── presentations/     # Your presentations go here
│   └── my-talk/
│       └── slides.md
├── slides/            # Shared/reusable slides
│   ├── intro/
│   └── closing/
├── components/        # Vue components
├── theme/             # Custom theme
└── scripts/           # Build tools
```

---
layout: two-cols
---

# Creating a Presentation

Create a new folder in `presentations/`:

```bash
mkdir presentations/my-talk
```

Then create `slides.md`:

```yaml
---
theme: ../../theme
title: My Talk Title
description: What it's about
date: 2025-01-15
listed: true
layout: cover
---

# My Talk Title
```

::right::

<div class="mt-8">

### Frontmatter Options

| Option | Description |
|--------|-------------|
| `title` | Presentation title |
| `description` | Short description |
| `date` | Presentation date |
| `listed` | Show in landing page |
| `tags` | Filterable tags |

</div>

---

# Using Shared Slides

Import reusable slides with the `src` directive:

```markdown
---
src: ../../slides/intro/about-me.md
---

---

# Your Custom Slide

Content here...

---
src: ../../slides/closing/questions.md
---
```

This keeps your talks DRY and consistent!

---
layout: two-cols
---

# Available Components

## KeyPoints

```vue
<KeyPoints
  title="Key Takeaways"
  :points="[
    'Point one',
    'Point two'
  ]"
  :animate="false"
/>
```

::right::

<div class="mt-16">

<KeyPoints
  title="Key Takeaways"
  :points="[
    'Point one',
    'Point two'
  ]"
  :animate="false"
/>

</div>
---
layout: two-cols
---

# Available Components

## Speaker

```vue
<Speaker
  name="Your Name"
  role="Developer"
  :social="[
    { platform: 'GitHub',
      url: 'https://github.com/you' }
  ]"
/>
```

::right::

<div class="mt-16">

<Speaker
  name="Jane Doe"
  role="Software Engineer"
  :social="[
    { platform: 'GitHub', url: '#' }
  ]"
/>

</div>
---

# Theme Layouts

The theme includes **19 layouts**:

<div class="grid grid-cols-3 gap-4 mt-4 text-sm">

<div>

- `default` - Standard slide
- `cover` - Title slide
- `center` - Centered content
- `two-cols` - Two columns
- `two-cols-header` - With header
- `image-right` - Image on right

</div>
<div>

- `image-left` - Image on left
- `quote` - Blockquote style
- `section` - Section divider
- `fact` - Big fact/number
- `statement` - Bold statement
- `intro` - Introduction

</div>
<div>

- `full` - Full bleed
- `iframe` - Embed iframe
- `iframe-left` - Iframe + content
- `iframe-right` - Content + iframe
- `end` - Closing slide
- `none` - No styling

</div>

</div>

---
layout: section
---

# Customizing the Theme

---

# Theme Colors

Edit `theme/styles/index.css`:

```css
:root {
  /* Change these for your brand */
  --color-primary: #2563eb;      /* Main brand color */
  --color-primary-dark: #1d4ed8; /* Darker variant */
  --color-text-heading: #1e40af; /* Heading color */
  --color-link: #2563eb;         /* Link color */
}
```

All default colors are WCAG 2.2 AA conformant!

---
layout: two-cols
---

# Development Commands

```bash
# List all presentations
pnpm run list

# Start dev server
pnpm run dev getting-started

# Build for production
pnpm run build getting-started

# Build all presentations
pnpm run build:all

# Export to PDF
pnpm run export getting-started
```

::right::

<div class="mt-8">

### Tips

- Use `pnpm run list` to see available presentations
- Dev server has hot reload
- Build creates static files in `dist/`
- PDF export requires Playwright

</div>

---
layout: center
---

# Adding Your Logo

1. Add your logo to `public/` (e.g., `logo.png` or `logo.svg`)

2. Enable it in your slides:

```
logo: true           → uses /logo.png
logo: /my-logo.svg   → uses custom path
```

The logo appears in the top-right corner.

---

# Deployment

### GitHub Pages

The included workflow (`.github/workflows/deploy.yml`) automatically:

1. Builds all listed presentations
2. Generates a landing page
3. Deploys to GitHub Pages

Just push to `main` and enable Pages in your repo settings!

---
layout: center
class: text-center
---

# Ready to Start?

<div class="mt-8 text-xl">

1. Fork or clone this template
2. Create your presentation in `presentations/`
3. Run `pnpm run dev your-presentation`
4. Start presenting!

</div>

<div class="mt-12 opacity-60">

Questions? Check the README or open an issue.

</div>
