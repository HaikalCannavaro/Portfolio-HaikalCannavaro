# Desktop theme and cursor interaction

## Included
- Header light/dark button with sun/moon icons, a 44px minimum target, visible keyboard focus, and accessible pressed state.
- Explicit theme choice saved in localStorage and synchronized between tabs. A pre-paint script restores the choice before hydration; blocked storage falls back to a working session-only toggle.
- The original cream/cobalt palette remains the first-visit default. Dark mode uses charcoal, warm white and periwinkle accents, with deep cobalt panels. Project surrounds, borders, controls and scroll transitions all adapt.
- Theme tokens are desktop-scoped. The mobile layout is preserved; its shared logo and decorative marks were updated to match desktop. Mobile does not show this desktop toggle. Existing project/blog subpages retain their original styling.
- The 3D portrait now responds smoothly to the mouse anywhere in the viewport, with small bounded horizontal/vertical turns, rather than tracking only inside the canvas. Leaving the window returns attention to neutral. Dragging temporarily suspends follow so orbit controls do not fight the pointer. Pause, reset and reduced-motion behavior are preserved.

## Important model limitation
The supplied haikal-avatar.glb contains one mesh with one textured primitive, no skin/bones, separate eye objects or morph targets. This implementation moves the whole portrait, not independent eyes. Genuine eye tracking requires an updated GLB with separate eyeballs/pivots or an eye rig. No fake eyes were drawn on top and the original asset was not modified.

## Run
`npm ci`, then `npm run dev`. Production: `npm run build`, then `npm start`.

## Files changed
- app/layout.tsx (pre-paint preference restoration)
- components/desktop/ThemeToggle.tsx (new)
- components/desktop/DesktopPortfolio.tsx
- components/desktop/DesktopPortfolio.module.css
- components/desktop/SceneTransition.module.css
- components/desktop/AvatarScene.tsx

## Checks
- TypeScript (`npx tsc --noEmit`) passed.
- Focused desktop ESLint passed. Layout lint has the existing Google Fonts warning.
- Production build passed; inherited mobile autoprefixer warning remains. Build configuration skips type/lint validation, so those were run explicitly above.
- No public deployment or repository push.

- Chromium preview verified light/dark appearance, mouse toggle, keyboard Space toggle, persistence after reload, and dark about-section contrast.
- This browser could not create a WebGL context: the static poster remained visible. The cursor animation is implemented/type-checked but not visually verified with working WebGL. Controls now stay disabled until the 3D scene is ready, and preview mode is labelled honestly.
- Mobile layout and interaction structure were retained; device emulation, cross-tab synchronization and reduced-motion behavior were inspected in source but not exercised in this browser.

## Identity refinement
- Replaced every flower/asterisk symbol in the current desktop and mobile portfolios and chapter transitions with a custom vector double-diamond facet. This is an outlined geometric motif, not a flower, and uses the palette color rather than green emoji rendering.
- Replaced the top-left HC lettering and flower with a bespoke, restrained serif-line HC monogram, including fine serifs, an open C, and a delicate baseline. It inherits light/dark text colors and scales down on mobile.
- Shared vectors live in components/brand/BrandMarks.tsx. Existing home links and their accessible names are retained.

- Final vector monogram and diamond motif visually verified in Chromium in both light and dark modes. All flower glyphs removed from the active desktop/mobile/transition components.

## HC icon revision (latest)
The HC mark is now a compact, bold geometric monogram. H and C share a vertical stem, with a curved rectangular C and precise open terminals. This replaces the prior thin serif lettering. It remains original SVG geometry, not a downloaded/traced stock logo.

Visual references reviewed on Freepik (which redirected to Magnific):
- https://www.freepik.com/premium-vector/letter-hc-ch-hexagon-logo-geometric-shape-with-business-card-design-premium-vector_22982602.htm (cahayabiru): studied integration of two initials into one compact symbol; did not reuse the hexagon construction.
- https://www.freepik.com/premium-vector/rj-initial-monogram-logo-with-creative-square-style-design_338871341.htm (Md Razibul Islam): studied simple geometric framing and limited-color clarity; did not reuse its diamond frame or separated letters.
No stock asset was downloaded, purchased, or embedded.

Latest HC revision passed TypeScript, focused logo ESLint, production build, static export, and Chromium visual inspection in light and dark mode.

## Softer HC refinement (latest)
Retained the combined HC concept and shared upright. Reduced stroke weight from 7 to 5.5, rounded every terminal, replaced the rigid squared C with a flowing continuous curve, and added a restrained wave to the H crossbar. Both desktop and mobile inherit the same SVG.

Softer HC revision: TypeScript, focused lint, production build and static export passed. Chromium visually verified the final soft mark in both themes. The separate logo preview shows the exact same SVG paths on light and dark backgrounds.

## Reference-led emblem (current final)
The user supplied a black abstract swept emblem as the visual reference. The HC is now an original filled silhouette with an inclined shared structure, broad curved C, tapered terminals and a diagonal negative-space cut. It replaces the prior rounded line lettering. The supplied graphic was visually inspected; its exact silhouette was not traced or embedded. Desktop/mobile share the same theme-aware SVG, with unique mask IDs.

Current filled HC emblem: TypeScript, focused lint, production build and static export passed. Chromium verified final silhouette and mask in light/dark themes. Preview PNG uses the same SVG geometry.
