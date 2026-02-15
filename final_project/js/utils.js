export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

export function setText(el, value) {
  if (el) el.textContent = value;
}

export function formatMeters(meters) {
  if (meters === null || meters === undefined || meters === "") return "—";
  const num = Number(meters);
  if (Number.isNaN(num)) return String(meters);
  return `${num.toLocaleString()} m`;
}

export function safeUrl(url) {
  // Helps avoid broken links; returns empty string if not provided.
  return typeof url === "string" && url.trim() ? url.trim() : "";
}
