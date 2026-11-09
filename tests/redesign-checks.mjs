import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const slugs = ['foxlogger-internship', 'simasu-web', 'simasu-mobile', 'gary-portfolio'];
for (const slug of slugs) {
  const page = read(`app/blog/${slug}/page.tsx`);
  assert(page.includes('ProjectNavigation'), `${slug}: shared navigation`);
  assert(page.includes('<h1'), `${slug}: page heading`);
  assert(page.includes('href="/projects"'), `${slug}: deterministic collection return`);
  assert(!page.includes('router.back()'), `${slug}: direct entry safety`);
  assert(!page.includes('Content goes here'), `${slug}: no placeholder`);
  for (const [,asset] of page.matchAll(/src="(\/image\/[^\"]+)"/g)) assert(fs.existsSync(path.join(root,'public',asset)), `${slug}: image exists`);
  for (const [,chapter] of page.matchAll(/href="#(chapter-\d+)"/g)) assert(page.includes(`id="${chapter}"`), `${slug}: chapter anchor ${chapter}`);
  assert(read('components/work/projects.ts').includes(`/blog/${slug}`), `${slug}: reachable story`);
}
const logos = ['html5','css3','javascript','tailwindcss','figma','nodejs','laravel','mysql','prisma','go','java','postman','flutter','blender','cplusplus','csharp','git','github'];
for(const logo of logos) assert(read(`public/tool-icons/${logo}.svg`).includes('<svg'), `${logo}: local SVG`);
assert(read('components/toolbox/ToolCard.module.css').includes('(hover: hover)') || read('components/toolbox/ToolCard.module.css').includes('(hover:hover)'), 'Hover limited to capable pointers');
assert(read('components/toolbox/ToolCard.module.css').includes('prefers-reduced-motion'), 'Reduced-motion fallback');
assert(read('components/toolbox/ParticleMorph.tsx').includes('pairPixels'), 'Actual source-to-glyph particle pairing');
assert(read('components/toolbox/ParticleMorph.tsx').includes('from.x + (to.x - from.x)'), 'Particle geometry interpolation');
assert(!read('components/toolbox/ToolCard.module.css').includes('blur('), 'No optical blur morph');
console.log('PASS: 4 detail routes, return links, chapter anchors, image assets, 18 local logos, hover capability and reduced-motion guards.');
