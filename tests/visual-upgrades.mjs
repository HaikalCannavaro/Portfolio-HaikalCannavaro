import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

// 1. Typography & unused Google Font removal
const layout = read('app/layout.tsx');
assert(!layout.includes('fonts.googleapis.com'), 'Unused Poppins Google Font link should be removed');
assert(read('app/globals.css').includes('var(--font-copy)'), 'globals.css should use Bricolage Grotesque (--font-copy)');
assert(read('components/desktop/DesktopPortfolio.module.css').includes('var(--font-copy)'), 'Desktop portfolio should use --font-copy');
assert(read('components/mobile/MobilePortfolio.module.css').includes('var(--font-copy)'), 'Mobile portfolio should use --font-copy');
assert(read('app/projects/Projects.module.css').includes('var(--font-copy)'), 'Projects page should use --font-copy');
assert(read('app/blog/blog.module.css').includes('var(--font-copy)'), 'Blog pages should use --font-copy');

// 2. Body theme alignment & subtle paper grain overlay
const globals = read('app/globals.css');
assert(globals.includes('--background: #f2efe6'), 'Light body background should match warm ivory palette');
assert(globals.includes('--background: #171916'), 'Dark body background should match charcoal palette');
assert(globals.includes('/image/book-grain.svg'), 'Subtle paper grain overlay should use local book-grain.svg');

// 3. 3D Avatar rim lighting & ContactShadows
const avatar = read('components/desktop/AvatarScene.tsx');
assert(avatar.includes('ContactShadows'), 'AvatarScene should render ContactShadows');
assert(avatar.includes('hemisphereLight'), 'AvatarScene should include hemisphereLight');
assert(avatar.includes('#6384ff'), 'AvatarScene should include cobalt rim light');

// 4. Mobile theme button uses the same preference and event as desktop.
const mobileTsx = read('components/mobile/MobilePortfolio.tsx');
const mobileCss = read('components/mobile/MobilePortfolio.module.css');
const toggle = read('components/desktop/ThemeToggle.tsx');
const toggleCss = read('components/desktop/DesktopPortfolio.module.css');

assert(mobileTsx.includes('<ThemeToggle />'), 'Mobile header mounts the shared theme button');
assert(mobileCss.includes('html[data-theme="dark"]'), 'MobilePortfolio CSS should define dark mode tokens');
assert(toggle.includes('haikal-portfolio-theme') && toggle.includes('portfolio-theme-change'), 'Theme persists and synchronizes');
assert(toggle.includes('type="button"') && toggle.includes('aria-pressed={dark}'), 'Theme action is a keyboard-accessible toggle');
assert(toggleCss.includes('prefers-reduced-motion:no-preference') && toggleCss.includes('.themeToggle:active::before'), 'Mobile button animates when motion is enabled');

// 5. Hero PressStart2P preserved (Point 6 intentionally skipped)
assert(layout.includes('PressStart2P.woff2'), 'Hero PressStart2P font should remain untouched');

console.log('PASS: typography, paper grain, theme sync, avatar lighting, and compact mobile theme button.');
