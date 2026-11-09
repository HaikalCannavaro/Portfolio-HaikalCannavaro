# Scroll scene transitions

Three new desktop chapter interludes connect the introduction to selected work, selected work to the about section, and the toolbox to contact.

- Scroll-scrubbed circular iris wipes switch cream to cobalt or charcoal.
- Oversized chapter type and italic subtitles move in opposite directions.
- Sticky framing, restrained scaling and a rotating accent add depth.
- Animations reverse immediately when scrolling upward. No scroll hijacking, snapping or timed playback.
- Native section links skip interludes and go directly to the existing content.
- Touch devices, mobile and reduced-motion users retain the original uninterrupted layout, with no added interlude space.
- Framer Motion values update styles without React renders on each scroll frame. No dependencies added.

## Integration

Copy `components/desktop/SceneTransition.tsx`, `components/desktop/SceneTransition.module.css`, and the updated `components/desktop/DesktopPortfolio.tsx`. All existing content, 3D assets and avatar implementation are unchanged.

`npm ci`, then `npm run dev`. Production: `npm run build`, then `npm start`.

## Validation

- Production Next.js build passed.
- Explicit TypeScript check passed (`npx tsc --noEmit`).
- ESLint passed for both new/changed TypeScript files.
- Static export build passed in a separate preview checkout.
- Actual Chromium preview: all three transition scenes inspected, circular wipe progress confirmed at different positions and on reverse scrolling, native anchor navigation and mouse/keyboard skill tabs checked.
- Existing mobile files and AvatarScene.tsx were not modified. Reduced-motion and touch gating were verified in source, not with device emulation.
- Preview WebGL context creation failed on this run; the existing avatar poster fallback remained visible. Interactive 3D behavior was not revalidated on a working WebGL context.
- Inherited mobile CSS autoprefixer warning remains. Full-repository lint is not a claimed pass; see DESKTOP-REDESIGN.md for existing unrelated issues.

No public deployment or repository push was performed.
