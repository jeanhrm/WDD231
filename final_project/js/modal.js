import { qs } from "./utils.js";

let lastFocused = null;

export function initModal() {
  const modal = qs("#modal");
  const overlay = qs("#modalOverlay");
  const closeBtn = qs("#modalClose");

  if (!modal || !overlay || !closeBtn) return;

  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") trapFocus(e, modal);
  });
}

export function openModal({ title, bodyHtml }) {
  const modal = qs("#modal");
  const overlay = qs("#modalOverlay");
  const titleEl = qs("#modalTitle");
  const bodyEl = qs("#modalBody");

  if (!modal || !overlay || !titleEl || !bodyEl) return;

  lastFocused = document.activeElement;

  titleEl.textContent = title || "Details";
  bodyEl.innerHTML = bodyHtml || "";

  overlay.hidden = false;
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");

  const closeBtn = qs("#modalClose");
  closeBtn?.focus();
}

export function closeModal() {
  const modal = qs("#modal");
  const overlay = qs("#modalOverlay");
  if (!modal || !overlay) return;

  overlay.hidden = true;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");

  if (lastFocused && typeof lastFocused.focus === "function") {
    lastFocused.focus();
  }
  lastFocused = null;
}

export function isOpen() {
  const modal = qs("#modal");
  return modal && modal.hidden === false;
}

function trapFocus(e, modal) {
  const focusables = modal.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );

  const list = [...focusables].filter(el => el.offsetParent !== null);
  if (list.length === 0) return;

  const first = list[0];
  const last = list[list.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
