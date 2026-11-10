import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const read=p=>readFileSync(p,'utf8');
const book=read('components/work/WorkBook.tsx');
assert(book.includes('CLICK, HOLD & DRAG A PAGE'));
assert(book.includes('event.button !== 0'));

for(const token of ['[open, setOpen] = useState(false)','setPointerCapture','onPointerCancel','onLostPointerCapture','aria-selected','useMotionAllowed','?from=selected-work','suppressClick','busy.current']) assert(book.includes(token),token);
const css=read('components/work/WorkBook.module.css');
assert(!/useScroll|scrollY|onWheel|onScroll/.test(book), 'Book must not be driven by document scrolling');
assert(css.includes('.book{transform-style:flat}'), 'Backing and page paint layers must be isolated');
assert(css.includes('.spread{z-index:2;isolation:isolate}'));

for (const token of ['pageBlockLeft','pageBlockRight','backBoard','binding','coverForeEdge','coverTailEdge','ribbon']) assert(book.includes(token), token);
assert(css.includes('translateZ(-31px)'));
assert(css.includes("url('/image/book-grain.svg')"));
assert(read('public/image/book-grain.svg').includes('feTurbulence'));
for(const token of ['preserve-3d','backface-visibility:hidden','rotateY(180deg)','prefers-reduced-motion:reduce']) assert(css.includes(token),token);
let mobile=read('components/mobile/MobilePortfolio.tsx').replace('href={`${selected.storyHref}?from=selected-work`}','href={selected.storyHref}');
mobile=mobile.replace(/\/\/ SVG keeps[^\n]*\nfunction ArrowUpRight\(\) \{\n[^\n]*\n\}\n\n/, '').replaceAll('<ArrowUpRight />', '↗');
assert.equal(mobile,execFileSync('git',['show','61f1d8ec833a2e9c7f600395135a2e06542be13b:components/mobile/MobilePortfolio.tsx'],{encoding:'utf8'}),'Mobile swipe must remain unchanged');
const mobileCss=read('components/mobile/MobilePortfolio.module.css');
const originalMobileCss=execFileSync('git',['show','61f1d8ec833a2e9c7f600395135a2e06542be13b:components/mobile/MobilePortfolio.module.css'],{encoding:'utf8'});
const normalizedCss=mobileCss.replace('filter:contrast(1.08);','filter:grayscale(1) contrast(1.08);')
  .split('\n').filter(line=>!line.startsWith('.arrowIcon ')&&!line.startsWith('.dock a:last-of-type .arrowIcon')&&!line.startsWith('.socials .arrowIcon')).join('\n')
  .replace(' width:44px; height:44px; flex:0 0 44px; padding:0; line-height:1;', '');
assert.equal(normalizedCss, originalMobileCss, 'Only approved portrait color and arrow styles may change mobile');
assert.equal((read('app/projects/page.tsx').match(/from=all-projects/g)||[]).length,3);
assert(read('components/projects/ProjectBackLink.tsx').includes('=== "all-projects"'));
assert(!read('components/mobile/MobilePortfolio.module.css').includes('grayscale('));
console.log('PASS: book gesture, accessibility, reduced-motion and origin routing guards; mobile UI unchanged.');
