# Selected Works book

Desktop project presentation with an interactive CSS 3D hardback book.

- Desktop starts with a closed cover, opens in 3D, has four project spreads.
- Pointer-controlled two-sided paper turns, snap-back threshold, reverse dragging, repeated-action guards, buttons and keyboard tabs.
- Reduced-motion preference, inert hidden/turning surfaces, focus restoration and dark theme.
- Mobile swipe layout preserved; detail origin metadata, full-color portrait and platform-independent SVG arrows added.
- Detail back uses allowlisted query source: collection returns /projects, homepage/direct entry returns current responsive homepage works section.

Checks: production build, separate TypeScript, focused ESLint, three existing regression suites, new work-book.mjs and git diff --check passed. Browser checks verified closed cover/opening, short drag snap-back, full next drag, guarded repeated drag, normal project click after drag, selected-work back, collection back, and direct-entry fallback. OS reduced-motion and physical mobile devices not tested.

Run npm run build and npm run start -- --hostname 0.0.0.0 --port 3002. 

## Physical hardback revision

CSS 3D, not WebGL. Added independently positioned hardboard, spine and cut-paper faces, 28px page-block depth, woven-cloth and paper-grain artwork, foil-style cover typography, shaded gutter, subtle printed images and a ribbon bookmark. The paper remains a two-sided CSS sheet rather than a deformable WebGL mesh. Drag, keyboard, focus, back-origin behavior and mobile swipe are preserved.

Verified new opening, closing, chapter turn and settled paper layout in the preview browser. This browser cannot create a WebGL context; the existing hero avatar uses its existing fallback. Production build avoids development-only overlay for that pre-existing limitation.

## Scroll compositing fix

Reproduced green backing covering the bottom half of paper after the top of the open book scrolled above the viewport, matching the user's screenshot. The book shared one preserve-3d scene across decorative backing and interactive paper. Isolated them into ordered paint layers (flat book parent; spread isolation; explicit z-index) while retaining the cover/sheet's own 3D rotations. Verified the original lower-book position, turn at that position, scroll away/re-entry. No document-scroll event or progress drives the book; only gestures, buttons and keyboard change chapters. Mobile swipe interactions remain unchanged.
