import { qs, setText } from "./utils.js";
import { initModal } from "./modal.js";
import { initAttractionsPage } from "./attractions.js";

function initMenu() {
  const btn = qs("#menuBtn");
  const nav = qs("#primaryNav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
}

function setFooterMeta() {
  const yearEl = qs("#year");
  setText(yearEl, new Date().getFullYear());
}

initMenu();
setFooterMeta();
initModal();
initAttractionsPage();
