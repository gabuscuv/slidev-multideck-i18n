#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Landing page configuration
const LANDING_CONFIG = {
  title: 'Presentations',
  description: 'A collection of slide decks and training materials.',
  author: '',
  links: [],
};

// Load config from landing/config.json if exists
function loadConfig() {
  const configPath = join(ROOT, 'landing', 'config.json');
  if (existsSync(configPath)) {
    try {
      return { ...LANDING_CONFIG, ...JSON.parse(readFileSync(configPath, 'utf-8')) };
    } catch (e) {
      console.warn('Warning: Could not parse landing/config.json');
    }
  }
  return LANDING_CONFIG;
}

function extractFrontmatter(presentationName) {
  const slidesPath = join(ROOT, 'presentations', presentationName, 'slides.md');
  if (!existsSync(slidesPath)) return null;

  try {
    const content = readFileSync(slidesPath, 'utf-8');
    const { data } = matter(content);
    return {
      name: presentationName,
      title: data.title || presentationName,
      description: data.description || '',
      date: data.date || null,
      tags: data.tags || [],
      listed: data.listed !== false, // Default to true if not specified
      image: data.image || data.background || null,
    };
  } catch (e) {
    console.warn(`Warning: Could not parse frontmatter for ${presentationName}`);
    return {
      name: presentationName,
      title: presentationName,
      listed: true,
    };
  }
}

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function generateHTML(config, presentations) {
  const listedPresentations = presentations
    .filter(p => p && p.listed)
    .sort((a, b) => {
      // Sort by date descending, then by title
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.title.localeCompare(b.title);
    });

  const presentationCards = listedPresentations.map(p => `
      <a href="./${p.name}/" class="card">
        <h2>${escapeHtml(p.title)}</h2>
        ${p.description ? `<p class="description">${escapeHtml(p.description)}</p>` : ''}
        <div class="meta">
          ${p.date ? `<span class="date">${formatDate(p.date)}</span>` : ''}
          ${p.tags?.length ? `<span class="tags">${p.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</span>` : ''}
        </div>
      </a>`).join('\n');

  const linksHtml = config.links?.length
    ? `<div class="links">${config.links.map(l => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`).join('')}</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(config.title)}</title>
  <style>
    :root {
      --bg: #0f0f0f;
      --surface: #1a1a1a;
      --surface-hover: #252525;
      --text: #e0e0e0;
      --text-muted: #888;
      --accent: #3b82f6;
      --accent-hover: #60a5fa;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
    }

    header {
      text-align: center;
      margin-bottom: 4rem;
    }

    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, var(--accent), #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    header p {
      color: var(--text-muted);
      font-size: 1.25rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .links {
      margin-top: 1.5rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .links a {
      color: var(--accent);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border: 1px solid var(--accent);
      border-radius: 6px;
      transition: all 0.2s;
    }

    .links a:hover {
      background: var(--accent);
      color: var(--bg);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: var(--surface);
      border-radius: 12px;
      padding: 1.5rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
      border: 1px solid transparent;
    }

    .card:hover {
      background: var(--surface-hover);
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    .card h2 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: var(--text);
    }

    .card .description {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }

    .date {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tag {
      background: rgba(59, 130, 246, 0.15);
      color: var(--accent);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    .empty {
      text-align: center;
      color: var(--text-muted);
      padding: 4rem 2rem;
    }

    @media (max-width: 600px) {
      .container {
        padding: 2rem 1rem;
      }

      h1 {
        font-size: 2rem;
      }

      .grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${escapeHtml(config.title)}</h1>
      ${config.description ? `<p>${escapeHtml(config.description)}</p>` : ''}
      ${linksHtml}
    </header>

    <main>
      ${listedPresentations.length > 0
        ? `<div class="grid">${presentationCards}</div>`
        : '<div class="empty"><p>No presentations available yet.</p></div>'
      }
    </main>
  </div>
</body>
</html>`;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function generateLanding(distDir, presentationNames) {
  const config = loadConfig();
  const presentations = presentationNames.map(name => extractFrontmatter(name));

  const html = generateHTML(config, presentations);
  const outPath = join(distDir, 'index.html');

  writeFileSync(outPath, html);
  console.log(`Landing page generated: ${outPath}`);
}

// Allow running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { readdirSync } = await import('fs');
  const presentationsDir = join(ROOT, 'presentations');
  const presentations = readdirSync(presentationsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const distDir = join(ROOT, 'dist');
  if (!existsSync(distDir)) {
    const { mkdirSync } = await import('fs');
    mkdirSync(distDir, { recursive: true });
  }

  await generateLanding(distDir, presentations);
}
