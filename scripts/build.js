#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync, mkdirSync, rmSync, symlinkSync, readdirSync, readFileSync, cpSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const DIRS = {
  presentations: resolve(ROOT, 'presentations'),
  slides: resolve(ROOT, 'slides'),
  components: resolve(ROOT, 'components'),
  layouts: resolve(ROOT, 'layouts'),
  public: resolve(ROOT, 'public'),
  styles: resolve(ROOT, 'styles'),
  theme: resolve(ROOT, 'theme'),
  dist: resolve(ROOT, 'dist'),
  temp: resolve(ROOT, '.slidev-temp'),
};

// Shared directories to symlink into presentation workspace
const SHARED_DIRS = ['components', 'layouts', 'public', 'styles', 'slides', 'theme'];

function listPresentations() {
  if (!existsSync(DIRS.presentations)) return [];
  return readdirSync(DIRS.presentations, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .filter(d => existsSync(join(DIRS.presentations, d.name, 'slides.md')))
    .map(d => d.name);
}

function setupWorkspace(presentationName) {
  const presentationDir = join(DIRS.presentations, presentationName);
  const workspaceDir = join(DIRS.temp, presentationName);

  // Clean and create workspace
  if (existsSync(workspaceDir)) {
    rmSync(workspaceDir, { recursive: true });
  }
  mkdirSync(workspaceDir, { recursive: true });

  // Symlink shared directories
  for (const dir of SHARED_DIRS) {
    const source = DIRS[dir] || resolve(ROOT, dir);
    const target = join(workspaceDir, dir);
    if (existsSync(source)) {
      symlinkSync(source, target);
    }
  }

  // Symlink slides.md
  const slidesSource = join(presentationDir, 'slides.md');
  const slidesTarget = join(workspaceDir, 'slides.md');
  symlinkSync(slidesSource, slidesTarget);

  // Symlink presentation-specific components if they exist
  const localComponents = join(presentationDir, 'components');
  if (existsSync(localComponents)) {
    // Merge with shared components by creating a merged directory
    const mergedComponents = join(workspaceDir, 'components');
    if (existsSync(mergedComponents)) {
      rmSync(mergedComponents); // Remove the symlink
    }
    mkdirSync(mergedComponents, { recursive: true });

    // Symlink shared components
    if (existsSync(DIRS.components)) {
      for (const file of readdirSync(DIRS.components)) {
        symlinkSync(join(DIRS.components, file), join(mergedComponents, file));
      }
    }
    // Symlink local components (override shared)
    for (const file of readdirSync(localComponents)) {
      const target = join(mergedComponents, file);
      if (existsSync(target)) rmSync(target);
      symlinkSync(join(localComponents, file), target);
    }
  }

  // Symlink presentation-specific public assets if they exist
  const localPublic = join(presentationDir, 'public');
  if (existsSync(localPublic)) {
    const mergedPublic = join(workspaceDir, 'public');
    if (existsSync(mergedPublic)) {
      rmSync(mergedPublic);
    }
    mkdirSync(mergedPublic, { recursive: true });

    if (existsSync(DIRS.public)) {
      for (const file of readdirSync(DIRS.public)) {
        symlinkSync(join(DIRS.public, file), join(mergedPublic, file));
      }
    }
    for (const file of readdirSync(localPublic)) {
      const target = join(mergedPublic, file);
      if (existsSync(target)) rmSync(target);
      symlinkSync(join(localPublic, file), target);
    }
  }

  // Copy package.json for Slidev to find dependencies
  const pkgSource = join(ROOT, 'package.json');
  const pkgTarget = join(workspaceDir, 'package.json');
  cpSync(pkgSource, pkgTarget);

  // Symlink node_modules
  const nmSource = join(ROOT, 'node_modules');
  const nmTarget = join(workspaceDir, 'node_modules');
  if (existsSync(nmSource)) {
    symlinkSync(nmSource, nmTarget);
  }

  return workspaceDir;
}

function runSlidev(workspaceDir, command, args = []) {
  return new Promise((resolve, reject) => {
    const slidevBin = join(ROOT, 'node_modules', '.bin', 'slidev');
    const proc = spawn(slidevBin, [command, ...args], {
      cwd: workspaceDir,
      stdio: 'inherit',
      shell: true,
    });

    proc.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`Slidev exited with code ${code}`));
    });

    proc.on('error', reject);
  });
}

async function dev(presentationName) {
  const presentations = listPresentations();

  if (!presentationName) {
    console.log('Available presentations:');
    presentations.forEach(p => console.log(`  - ${p}`));
    console.log('\nUsage: npm run dev <presentation-name>');
    process.exit(1);
  }

  if (!presentations.includes(presentationName)) {
    console.error(`Presentation "${presentationName}" not found.`);
    console.log('Available:', presentations.join(', '));
    process.exit(1);
  }

  console.log(`Starting dev server for: ${presentationName}`);
  const workspace = setupWorkspace(presentationName);
  await runSlidev(workspace, '', ['--open']);
}

async function build(presentationName, buildAll = false) {
  const presentations = listPresentations();

  if (buildAll) {
    console.log('Building all presentations...');

    // Clean dist
    if (existsSync(DIRS.dist)) {
      rmSync(DIRS.dist, { recursive: true });
    }
    mkdirSync(DIRS.dist, { recursive: true });

    for (const name of presentations) {
      console.log(`\nBuilding: ${name}`);
      const workspace = setupWorkspace(name);
      const outDir = join(DIRS.dist, name);
      await runSlidev(workspace, 'build', ['--base', `/${name}/`, '--out', outDir]);
    }

    // Generate landing page
    console.log('\nGenerating landing page...');
    const { generateLanding } = await import('./generate-landing.js');
    await generateLanding(DIRS.dist, presentations);

    console.log('\nBuild complete! Output in ./dist');
    return;
  }

  if (!presentationName) {
    console.log('Available presentations:');
    presentations.forEach(p => console.log(`  - ${p}`));
    console.log('\nUsage:');
    console.log('  npm run build <presentation-name>  # Build single presentation');
    console.log('  npm run build:all                  # Build all presentations');
    process.exit(1);
  }

  if (!presentations.includes(presentationName)) {
    console.error(`Presentation "${presentationName}" not found.`);
    process.exit(1);
  }

  console.log(`Building: ${presentationName}`);
  const workspace = setupWorkspace(presentationName);
  const outDir = join(DIRS.dist, presentationName);

  if (existsSync(outDir)) {
    rmSync(outDir, { recursive: true });
  }

  await runSlidev(workspace, 'build', ['--out', outDir]);
  console.log(`\nBuild complete! Output in ./dist/${presentationName}`);
}

async function preview(presentationName) {
  const presentations = listPresentations();

  if (!presentationName) {
    console.log('Usage: npm run preview <presentation-name>');
    process.exit(1);
  }

  const outDir = join(DIRS.dist, presentationName);
  if (!existsSync(outDir)) {
    console.error(`Build not found for "${presentationName}". Run build first.`);
    process.exit(1);
  }

  // Preview from dist
  const workspace = setupWorkspace(presentationName);
  await runSlidev(workspace, 'build', ['--out', outDir]);
}

async function exportPdf(presentationName) {
  const presentations = listPresentations();

  if (!presentationName) {
    console.log('Usage: npm run export <presentation-name>');
    process.exit(1);
  }

  if (!presentations.includes(presentationName)) {
    console.error(`Presentation "${presentationName}" not found.`);
    process.exit(1);
  }

  console.log(`Exporting PDF: ${presentationName}`);
  const workspace = setupWorkspace(presentationName);
  await runSlidev(workspace, 'export', ['--output', join(DIRS.dist, `${presentationName}.pdf`)]);
}

function list() {
  const presentations = listPresentations();

  if (presentations.length === 0) {
    console.log('No presentations found.');
    console.log('Create one at: presentations/<name>/slides.md');
    return;
  }

  console.log('Available presentations:\n');
  presentations.forEach(p => console.log(`  ${p}`));
  console.log(`\nTotal: ${presentations.length}`);
}

// Parse arguments and run
const args = process.argv.slice(2);
const command = args[0];
const presentationName = args.find(a => !a.startsWith('-'));
const buildAll = args.includes('--all');

// Filter out the command from presentationName if it matches
const actualPresentationName = presentationName === command ? args[1] : presentationName;

switch (command) {
  case 'list':
    list();
    break;
  case 'dev':
    dev(args[1]);
    break;
  case 'build':
    build(args[1], buildAll);
    break;
  case 'preview':
    preview(args[1]);
    break;
  case 'export':
    exportPdf(args[1]);
    break;
  default:
    console.log('Usage:');
    console.log('  pnpm run list                   # List all presentations');
    console.log('  pnpm run dev <presentation>     # Start dev server');
    console.log('  pnpm run build <presentation>   # Build single presentation');
    console.log('  pnpm run build:all              # Build all presentations');
    console.log('  pnpm run export <presentation>  # Export to PDF');
    process.exit(1);
}
