import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
const book=read('components/work/WorkBook.tsx');
assert(book.includes('CLICK, HOLD & DRAG A PAGE'));
assert(book.includes('event.button !== 0'));

for(const token of ['[open, setOpen] = useState(false)','setPointerCapture','onPointerCancel','onLostPointerCapture','aria-selected','useMotionAllowed','?from=selected-work','suppressClick','busy.current']) assert(book.includes(token),token);
for (const token of ['coverRotation', 'toggleCover(false)', 'coverAnimation.current?.stop()', 'Math.abs(end - coverRotation.get()) / 180 * 1.5']) assert(book.includes(token), token);
assert(!book.includes('{coverVisible && <motion.div'), 'Cover hinge must remain mounted to reverse smoothly');
const css=read('components/work/WorkBook.module.css');
assert(!/useScroll|scrollY|onWheel|onScroll/.test(book), 'Book must not be driven by document scrolling');
assert(css.includes('.book{transform-style:flat}'), 'Backing and page paint layers must be isolated');
assert(css.includes('.spread{z-index:2;isolation:isolate}'));

for (const token of ['pageBlockLeft','pageBlockRight','backBoard','binding','coverForeEdge','coverTailEdge']) assert(book.includes(token), token);
assert(css.includes('translateZ(-31px)'));
assert(css.includes("url('/image/book-grain.svg')"));
assert(read('public/image/book-grain.svg').includes('feTurbulence'));
for(const token of ['preserve-3d','backface-visibility:hidden','rotateY(180deg)','prefers-reduced-motion:reduce']) assert(css.includes(token),token);
const mobile = read('components/mobile/MobilePortfolio.tsx');
const mobileCss = read('components/mobile/MobilePortfolio.module.css');
assert(mobile.includes('drag="x"') && mobile.includes('dragSnapToOrigin'), 'Horizontal project swipe');
assert(mobile.includes('Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 400'), 'Swipe distance and velocity thresholds');
assert(mobile.includes('changeProject(project + (info.offset.x < 0 ? 1 : -1))'), 'Swipe direction');
assert(mobile.includes('(next + projects.length) % projects.length'), 'Deck wraps at both ends');
assert(mobile.includes('onClick={() => changeProject(project - 1)}') && mobile.includes('onClick={() => changeProject(project + 1)}'), 'Previous and next controls');
assert(mobile.includes('selected.storyHref}?from=selected-work'), 'Selected-work return path');
assert.match(mobileCss, /\.project\s*\{[^}]*touch-action:\s*pan-y/, 'Vertical page scroll remains available over the deck');
assert.equal((read('app/projects/page.tsx').match(/from=all-projects/g)||[]).length,3);
assert(read('components/projects/ProjectBackLink.tsx').includes('=== "all-projects"'));
assert(!read('components/mobile/MobilePortfolio.module.css').includes('grayscale('));
console.log('PASS: book gesture, accessibility, reduced-motion and origin routing guards; mobile swipe and button navigation.');

assert(!book.includes('% projects.length') && !book.includes('% 4'), 'Book must not wrap at either boundary');
for(const token of ['drag.cover', 'Close back cover', 'Open from the back', 'originalOpen']) assert(book.includes(token), token);

for(const token of ['leftPaperReveal', 'rightPaperReveal']) assert(book.includes(token), token);

for(const token of ['const spreads = ["Introduction"', 'LeftContent', 'RightContent', 'BookNote closing', 'index * 2 + 3']) assert(book.includes(token), token);
assert(book.includes('rightPaperReveal = coverSide === "back" ? 0 : 1'), 'Introduction must not dim with cover motion');
assert(book.includes('leftPaperReveal = coverSide === "front" ? 0 : 1'), 'Closing note must not dim with cover motion');
assert(css.includes('.cover[data-side=back]{left:calc(50% + 7px)}'), 'Back cover must align with right-side hinge and backing');
assert(css.includes('rotateY(22deg) rotateZ(7deg)'), 'Back resting pose must mirror the front');
assert(css.includes('.insideCover,.coverBack{background-color:var(--cloth)'), 'Inside cover walls must use cloth rather than paper');

assert(css.includes('--rest-side:1') && css.includes('var(--rest-side) * 22deg'), 'Closed poses share signed mirror geometry');
assert(css.includes('.spread{height:580px;min-height:580px'), 'Front and back must have identical dimensions');
assert(book.includes('function CoverImprint()') && book.includes('<CoverImprint />'));

assert(!book.includes('s.ribbon') && !css.includes('.ribbon'), 'Removed detached bookmark ribbon');
assert(!book.includes('opacity: coverSide'), 'Cover parent must not flatten its two-sided 3D faces via opacity');

assert(css.includes('.cover[data-side=back] .coverForeEdge{transform:rotateY(-90deg)}') && css.includes('.cover[data-side=back] .coverTailEdge{transform:rotateX(90deg)}'), 'Back board edge faces must bridge the negative-Z skins');
