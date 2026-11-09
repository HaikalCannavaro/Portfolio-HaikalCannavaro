# Folding desktop navigation

## Behavior
- The full header is visible at the top, preserving its original position and 106px layout space.
- Past 96px of scrolling, the same fixed shell contracts toward the upper-right into a 58px HC-only button, with no hamburger lines. It returns to the full header at 24px from the top. The two thresholds prevent flickering around the boundary.
- The button stays fixed to the viewport (not absolute to document content). Click to open the compact navigation panel, including links to every section and a theme toggle.
- Returning to the top unwraps the header and closes the menu. The 800ms ease-in-out shell motion and staggered content fades avoid a sudden snap. The animation reverses naturally if scrolling is interrupted.
- The mobile bottom navigation now uses the latest HC emblem, matching its header. The mobile layout and existing navigation links are retained.

## Accessibility and resilience
- Native button, expanded state, controls relationship, labelled navigation, visible keyboard focus, and inert hidden navigation content.
- Opening keeps focus on the trigger; Tab moves into the revealed links, following the standard disclosure pattern. Escape closes and returns focus to the toggle. Clicking outside, moving focus outside, selecting a link, returning to the top, or switching to mobile closes the panel.
- Selecting a section moves focus to its destination without a second scroll. Normal anchors and browser history are preserved. No scroll lock or modal focus trap.
- Reduced-motion preference disables the morph and menu transitions while preserving navigation.
- Theme buttons in the header and floating menu synchronize in the same page as well as between tabs; saved theme behavior is preserved.
- Scroll events are passive and batched with requestAnimationFrame; state changes only at the threshold. Event listeners are cleaned up on unmount.
- No dependencies added, no public deployment or push.

## Integration
New files: components/desktop/DesktopNavigation.tsx and DesktopNavigation.module.css.
Updated: DesktopPortfolio.tsx, ThemeToggle.tsx, MobilePortfolio.tsx, MobilePortfolio.module.css.

## Checks
See delivery summary for final tested flows and environmental limits. Run npm ci, npm run dev. Production: npm run build, npm start.

## Final verification
- Production Next.js build and static export passed.
- Explicit TypeScript check and focused ESLint passed (desktop, shared branding, mobile component). Inherited mobile autoprefixer warning remains; full-repository lint is not claimed.
- Real Chromium: full header at top; collapse on scrolling; HC-only trigger; opening/closing; Space activation; Tab into revealed links; Escape and focus return; outside-click dismissal; section anchor navigation and focus; browser Back/Forward; return-to-top unwrap; rapid down/up reversal; dark/light controls synchronized between menu and header.
- Browser 390px/800px iframe viewports: mobile header and bottom dock show the current emblem, desktop header fits the narrow desktop breakpoint, and document scroll widths match viewport widths. This is responsive-layout QA, not physical touch-device testing.
- Reduced-motion CSS inspected (transitions disabled), but an OS reduced-motion setting was not exercised in this browser. Resize dismissal and cross-tab theme behavior were inspected in source, not separately exercised.
- The browser cannot create a WebGL context; the pre-existing portrait poster fallback is visible. No new claims about 3D cursor verification.
- The supplied preview PNG illustrates the implemented states; it is not a browser screenshot or animation recording.
