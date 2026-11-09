# Portfolio readability, project pages, and toolbox

Based on repository commit `674d07290725e7773c65cc66cb97fdc867d677b9`.

## Changes
- Larger project descriptions, categories, dates, tags, education titles and qualifications on desktop and mobile.
- The collection now shares the portfolio's cream / cobalt editorial language, with Web / Mobile / AI filters, readable two-column cards, a one-column mobile layout, and links to every project.
- All four detail routes share a large editorial heading, local project imagery, chapter navigation, comfortable reading width, theme controls, and deterministic links back to the collection. Existing long-form FoxLogger and SIMASU Web text is retained.
- SIMASU Mobile and Gary's Portfolio previously contained placeholders. Their new concise pages use only project facts already in this repository, without invented results or metrics.
- Desktop toolbox uses a genuine geometric particle morph: the actual local SVG logo is sampled into colored particles, paired with sampled name glyphs, and the same particles move into letter positions over 950ms. No opacity crossfade or blur layer is used. Icon backgrounds and desktop tile backgrounds are removed. Exact artwork is rendered at rest. Pointer exit/focus loss reverses from the current progress; keyboard focus also reveals the name. Reduced motion switches immediately. Touch/coarse-pointer desktops retain visible labels.
- Desktop destination text now uses the bundled Syne variable display font at weight 800 (ExtraBold) and an individual logo-derived gradient for each tool. Light and dark palettes are tuned separately for readable large text. The accepted particle motion algorithm and 950ms timing are unchanged. Font loading finishes before glyph sampling.
- Syne is locally bundled from @fontsource-variable/syne 5.3.0; its SIL Open Font License is included at app/fonts/Syne-LICENSE.txt. No font CDN or runtime package is required.
- Mobile always shows logos and tool names, with no hover-dependent interaction; its static layout remains unchanged.
- Tool logos are bundled locally from Devicon 2.18.0. License is in public/tool-icons/LICENSE.txt; no third-party requests or new runtime dependency are needed.
- Folding HC navigation, avatar, home page motion, existing theme persistence, and mobile deck remain in place. Missing mobile story links for SIMASU Mobile and Gary's Portfolio are restored.

## Verification
- npm ci completed with a writable temporary npm cache.
- Explicit TypeScript check passed.
- Focused lint passed with no warnings or errors across all changed components and routes.
- Next.js production build passed and generated all routes. The inherited Next config skips type/lint validation during build, so they were run separately.
- node tests/redesign-checks.mjs verifies all four routes, return links, chapter anchors, images, 18 SVG logos, and motion/capability guards.
- node tests/morph-geometry.cjs passes: actual sampler/transport functions, 2,209 synthetic logo particles, exact endpoints, finite intermediate geometry, and reversal/reduced-motion/cleanup source guards.
- node tests/tool-palettes.cjs passes for all 18 light/dark palettes, with gradient-stop contrast of at least 3.40:1 against the intended backgrounds (large text).
- git diff --check passed.
- Full-repository lint still reports pre-existing errors in components/about/Word.tsx, components/hero/HeroText.tsx, and components/hero/ParallaxText.tsx, plus a font warning in app/layout.tsx. These unrelated files were not changed.

## Live preview verification
- Final Syne ExtraBold build: all five canvases report fontReady=true, fontFaces=1, fontFamily=toolboxDisplay. HTML visibly renders distinctive wide orange lettering at progress 1.000; Tailwind CSS fits fully and remains readable with its turquoise-to-blue gradient at 1.000.
- The current production build was restarted successfully in the cloud desktop browser.
- Five desktop toolbox canvases initialized with 2,651 / 2,674 / 3,481 / 1,045 / 1,809 paired particles.
- Desktop logos visibly have no icon or tile backgrounds.
- Keyboard focus on HTML showed intermediate geometric progress (0.035 and 0.628), reached 1.000, and visibly rendered the word HTML with its focus outline.
- In the gradient refinement, HTML visibly rendered orange text and CSS visibly rendered blue text at 1.000. Leaving HTML for CSS returned HTML to 0.000 and restored the shield logo.

## Verification limits
Mouse-only hover exit/reversal, long-label appearance, mobile rendering, and OS reduced-motion behavior were not exercised in the browser. Keyboard-driven reversal was verified. They are implemented and source-reviewed, but are not claimed as browser-tested. Testing stopped when the preview state changed unexpectedly to avoid interfering with concurrent user review. The broader project-page redesign has passed build/type/static checks, not a complete visual/browser regression suite.

The repository's existing Next.js 15.0.4 dependency emitted a known security-vulnerability warning during install. Dependency upgrades are outside this design change; upgrade to an appropriate patched version before deployment. No dependencies, lockfile, or Next configuration were changed.

No push or deployment was performed.
