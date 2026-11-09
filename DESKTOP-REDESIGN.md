# Desktop redesign + 3D portrait

Built on `portfolio-mobile-redesign-v2.zip`. The mobile components, mobile styles, existing project data, and case-study pages are unchanged. The desktop experience begins at 769px.

## What's new

- Cream-and-cobalt editorial layout with oversized typography and an asymmetrical project grid.
- Your supplied 3D self-portrait is the desktop hero. It follows the pointer gently, floats subtly, and can be dragged to rotate. Pause and reset controls are included.
- Warmer, darker skin colors guided by the supplied reference photograph. The adjustment is stored as vertex colors in the GLB, rather than tinting the entire model. Hair, maroon hoodie, and shoes retain their texture colors. Actual appearance varies with lighting.
- Scroll-driven title movement, portrait parallax, rotating graphic, animated type strip, section reveals, project-image hover movement, and animated skill tabs.
- Keyboard-accessible tabs, visible focus outlines, skip link, reduced-motion support, and a rendered portrait fallback when WebGL is unavailable.
- The 3D scene only mounts on desktop, loads near the viewport, and stops its continuous rendering when offscreen or paused.

## Files to integrate into an existing v2 checkout

Replace `app/page.tsx`, then copy these new folders:

- `components/desktop/`
- `public/models/`

No dependency changes are required. The project already includes Three.js, React Three Fiber, Drei, and Framer Motion.

## Model files

- `public/models/haikal-avatar.glb`: self-contained, web-ready model, approximately 4.8 MiB.
- `public/models/haikal-avatar-poster.png`: transparent render used as a loading/fallback portrait.

The supplied OBJ had 558,096 triangles. The web model has 111,618 triangles (80% reduction), with its original embedded texture preserved. It uses standard glTF vertex colors and needs no external decoder service. The original uploaded ZIP is not changed.

The Instagram reference informed the character-led presentation and interactive framing. This version keeps the portfolio's established cream/cobalt direction rather than copying the reference's dark design.

## Run

```sh
npm ci
npm run dev
```

Open the local address printed by Next.js. For production: `npm run build`, then `npm start`.

## Verification

- Production Next.js build: passed.
- Explicit TypeScript check (`npx tsc --noEmit`): passed. This check was run separately because the inherited Next.js config skips type checking during build.
- Lint for all changed/new TypeScript files: passed.
- Mobile preservation: byte-for-byte comparison against v2 confirmed the only changed pre-existing file is `app/page.tsx`.
- 3D model: inspected in Blender, exported and re-imported as GLB, with the adjusted skin, embedded texture, geometry, and orientation checked through renders.
- Full repository lint: not clean due to existing issues in old blog/hero/about files; no unrelated fixes were mixed into this redesign.
- Browser layout/interaction QA: not completed. The managed preview runner passes `--host` and `--strictPort`, which Next.js does not support, preventing the preview from starting. The normal project dev command is unchanged.

## Before deploying

Check desktop at 1024, 1440, and 1920px, and confirm the existing mobile layout at 390px. Try portrait drag/reset/pause, keyboard skill-tab navigation, project links, anchor navigation, browser back/forward, reduced-motion mode, and WebGL-disabled fallback. No GitHub push or deployment was performed.
