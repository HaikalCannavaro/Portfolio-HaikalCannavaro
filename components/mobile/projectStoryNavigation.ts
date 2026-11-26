import type { MouseEvent } from "react";

const storageKey = "hc-selected-work";
const mobile = "(max-width: 768px)";

export function selectedWorkHref(storyPath: string) {
  const slug = storyPath.split("/").pop() || "";
  return `/?project=${encodeURIComponent(slug)}#m-work`;
}

export function isPlainClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.defaultPrevented && !event.metaKey &&
    !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function rememberCard(storyPath: string) {
  const position = { storyPath, y: window.scrollY, width: window.innerWidth };
  window.history.replaceState({ ...window.history.state, selectedWork: position }, "", selectedWorkHref(storyPath));
  try { sessionStorage.setItem(storageKey, JSON.stringify(position)); } catch { /* History still holds the position. */ }
}

export function restoreCardPosition(storyPath: string, cover: HTMLElement) {
  let position = window.history.state?.selectedWork;
  if (position?.storyPath !== storyPath) {
    try { position = JSON.parse(sessionStorage.getItem(storageKey) || "null"); } catch { /* A shared link can open without stored state. */ }
  }
  if (position?.storyPath === storyPath && position.width === window.innerWidth && Number.isFinite(position.y)) {
    window.scrollTo({ top: position.y, behavior: "instant" });
  } else {
    cover.scrollIntoView({ block: "center", behavior: "instant" });
  }
}

function waitForCover(selector: string): Promise<HTMLElement | null> {
  return new Promise(resolve => {
    const complete = () => {
      const cover = document.querySelector<HTMLElement>(selector);
      if (!cover) return;
      observer.disconnect();
      clearTimeout(timeout);
      resolve(cover);
    };
    const observer = new MutationObserver(complete);
    const timeout = window.setTimeout(() => { observer.disconnect(); resolve(null); }, 1200);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-deck-cover"] });
    complete();
  });
}

// Browser Back already drives the router. Carry the departing image across that
// navigation without intercepting history or delaying the back gesture.
export async function animateHistoryReturn(storyPath: string) {
  const url = new URL(location.href);
  if (url.pathname !== "/" || url.searchParams.get("project") !== storyPath.split("/").pop() ||
      !matchMedia(mobile).matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cover = document.querySelector<HTMLElement>("[data-story-cover]");
  const image = cover?.querySelector("img");
  if (!cover || !image?.complete || !image.naturalWidth || typeof cover.animate !== "function") return;
  const from = cover.getBoundingClientRect();
  if (from.bottom <= 0 || from.top >= window.innerHeight) return;

  const layer = document.createElement("img");
  layer.src = image.currentSrc || image.src;
  layer.alt = "";
  layer.setAttribute("aria-hidden", "true");
  const paint = getComputedStyle(cover);
  Object.assign(layer.style, {
    position: "fixed", pointerEvents: "none", zIndex: "9997", objectFit: "contain",
    top: `${from.y}px`, left: `${from.x}px`, width: `${from.width}px`, height: `${from.height}px`,
    padding: paint.padding, background: paint.backgroundColor, transformOrigin: "top left",
  });
  document.body.appendChild(layer);
  try {
    const target = await waitForCover(`[data-deck-cover="${CSS.escape(storyPath)}"]`);
    if (!target || location.pathname !== "/") return;
    restoreCardPosition(storyPath, target);
    const to = target.getBoundingClientRect();
    const transform = `translate(${to.x - from.x}px, ${to.y - from.y}px) scale(${to.width / from.width}, ${to.height / from.height})`;
    await layer.animate([
      { transform: "none", opacity: 1 },
      { transform, opacity: 0 },
    ], { duration: 340, easing: "cubic-bezier(.22,.8,.24,1)" }).finished.catch(() => {});
  } finally {
    layer.remove();
  }
}

type TransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void>) => { finished: Promise<void> };
};

export function navigateWithCover(
  event: MouseEvent<HTMLAnchorElement>, storyPath: string,
  direction: "open" | "return", navigate: () => void,
) {
  const start = (document as TransitionDocument).startViewTransition;
  if (!isPlainClick(event) || !start || !matchMedia(mobile).matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  event.preventDefault();
  const root = document.documentElement;
  if (root.hasAttribute("data-project-transition")) return;
  root.setAttribute("data-project-transition", direction);
  const target = direction === "open" ? "[data-story-cover]" : `[data-deck-cover="${CSS.escape(storyPath)}"]`;
  const transition = start.call(document, async () => {
    const ready = waitForCover(target);
    navigate();
    const cover = await ready;
    if (!cover) return;
    if (direction === "open") window.scrollTo({ top: 0, behavior: "instant" });
    else restoreCardPosition(storyPath, cover);
    const image = cover.querySelector("img");
    if (image && !image.complete) {
      await Promise.race([image.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 160))]);
    }
  });
  const cleanup = () => root.removeAttribute("data-project-transition");
  void transition.finished.then(cleanup, cleanup);
}
