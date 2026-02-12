const visitEl = document.querySelector("#visitMessage");
const key = "chamber_last_visit";
const now = Date.now();

const last = Number(localStorage.getItem(key));

if (!last) {
  visitEl.textContent = "Welcome! This is your first visit.";
} else {
  const diffMs = now - last;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    visitEl.textContent = "Back so soon! Awesome.";
  } else if (diffDays === 1) {
    visitEl.textContent = "You last visited 1 day ago.";
  } else {
    visitEl.textContent = `You last visited ${diffDays} days ago.`;
  }
}

localStorage.setItem(key, String(now));
