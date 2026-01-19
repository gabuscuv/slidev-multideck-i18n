# Slidev Theme Starter

A WCAG 2.2 AA compliant Slidev theme with 19 layouts.

## Features

- **Accessible**: All color combinations meet WCAG 2.2 AA contrast requirements
- **Dark/Light Mode**: Full support for both color schemes
- **19 Layouts**: Cover, two-cols, image layouts, quotes, and more
- **Customizable**: Easy color customization via CSS variables
- **Professional**: Clean, modern design suitable for technical presentations

## Customization

### Colors

Edit `styles/index.css` to customize your brand colors:

```css
:root {
  /* Primary colors - customize these for your brand */
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-primary-gradient: linear-gradient(135deg, #3b82f6, #2563eb);

  /* Text colors */
  --color-text-heading: #1e40af;
  --color-link: #2563eb;
}
```

### Logo

To add your logo:

1. Place your logo in `public/` (e.g., `public/logo.png` or `public/logo.svg`)
2. Enable it on slides in frontmatter:

```yaml
---
layout: cover
logo: true              # Uses default /logo.png
---

# Or specify a custom path:
---
layout: cover
logo: /my-logo.svg      # Uses custom file
---
```

### Fonts

The theme uses:
- **Atkinson Hyperlegible** - Designed for readability and accessibility
- **JetBrains Mono** - For code blocks

To change fonts, edit the Google Fonts import and `--font-sans` / `--font-mono` variables.

## Available Layouts

| Layout | Description |
|--------|-------------|
| `default` | Standard slide with title and content |
| `cover` | Title slide with gradient bar |
| `center` | Centered content |
| `intro` | Introduction slide with gradient |
| `section` | Section divider |
| `two-cols` | Two-column layout |
| `two-cols-header` | Two columns with header row |
| `image-right` | Content left, image right |
| `image-left` | Image left, content right |
| `image` | Full-bleed background image |
| `quote` | Blockquote styling |
| `fact` | Large centered fact/number |
| `statement` | Bold centered statement |
| `iframe` | Embedded iframe |
| `iframe-left` | Iframe left, content right |
| `iframe-right` | Content left, iframe right |
| `full` | Full bleed, no padding |
| `end` | Closing slide |
| `none` | No styling applied |

## Layout Props

Most layouts support these props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `boolean` | `false` | Show logo in corner |
| `class` | `string` | - | Additional CSS classes |
| `layoutClass` | `string` | - | Classes for the layout wrapper |

## Accessibility

This theme follows WCAG 2.2 AA guidelines:

- Color contrast ratios documented in CSS
- Focus indicators for interactive elements
- Supports `prefers-reduced-motion`
- Semantic heading structure

## License

MIT
