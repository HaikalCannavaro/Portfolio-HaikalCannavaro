# Mobile portfolio redesign — Editorial Motion / v2

A complete mobile art direction rather than a motion overlay. At widths up to 768px the homepage becomes a new editorial composition. The existing desktop composition remains available above that breakpoint.

## Visual direction
Warm ivory (#f2efe6), electric cobalt (#284be8), vermilion (#c9462c), charcoal, and sage. Oversized typography, serif accents, index labels, portrait photography, thin rules, tactile cards, and generous section rhythm replace the previous purple mobile layout. The palette continues into the project gallery and story pages.

## Interaction design
- Staggered masked headline entrance.
- Scroll-linked portrait translation and rotation, orbital linework, and large typographic movement.
- Tap-to-turn portrait with a perspective-based 3D transition.
- Scroll-driven typography ribbon, without an endless autoplay loop.
- Swipe/drag project deck with directional exit/entry choreography and tactile backing card. Previous/next buttons provide an accessible alternative to dragging.
- Scroll-triggered editorial section entrances.
- Animated education disclosure.
- Spring-driven shared tab indicator with staggered skill chips and keyboard-accessible tabs.
- Floating thumb-navigation dock with scroll progress and safe-area spacing.

Motion responds to the operating system's reduced-motion setting. Native vertical scrolling is retained, touch dragging uses pan-y, and no desktop WebGL scene is enabled on phones. No new dependencies were added.

## Run / apply
Run `npm ci` and `npm run dev` from the full source folder. The included `mobile-redesign-v2.patch` can instead be applied with `git apply` to the upstream base bc083099f458057792a3f5eec5980e2d161daa50.

This package contains the cumulative redesign, including the initial interaction refactor. No remote commit, pull request, or deployment has been made.

## Verification
- `npx tsc --noEmit`: passed.
- ESLint on new and modified TypeScript/TSX: passed.
- Production build: passed. Existing Next configuration skips lint/type checking during build, so those checks were also run separately.
- `git diff --check`: passed.
- Full repository lint has pre-existing errors in unrelated blog and animation files.
- Visual/browser testing remains unverified. Local Chromium failed to create its required socket; the connected browser could not reach this execution environment's local server. Do not treat the build as device/browser QA.

## Device acceptance checklist
Test at 320, 390, 540, 768, and 1024 CSS pixels, including iOS Safari and Android Chrome:
1. Scroll through the full mobile composition and check title fit, portrait parallax, section entrances, and dock spacing.
2. Flip the portrait twice; enable reduced motion and repeat.
3. Swipe projects in both directions, including first/last wrapping; use both arrow buttons repeatedly. Confirm vertical scrolling still works over a card and links are not accidentally triggered by a drag.
4. Expand/collapse the journey, switch skill tabs by touch and keyboard, and verify focus visibility.
5. Open a project story and All Projects; return to selected work and test browser Back/Forward.
6. Toggle reduced motion while the page is open. Verify movement is suppressed without removing any controls or content.
7. Check large text sizing, no horizontal viewport overflow, and dock clearance on devices with a home indicator.
8. Check the desktop composition at 1024px and above.

## Existing dependency maintenance
The upstream Next.js 15.0.4 dependency is flagged vulnerable by npm. Upgrade to a supported patched release and review the security advisory before deploying. Framework upgrades are not included in this visual refactor.
