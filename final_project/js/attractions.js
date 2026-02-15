import { qs, formatMeters, safeUrl } from "./utils.js";
import { loadState, saveState, toggleFavorite, isFavorite } from "./storage.js";
import { openModal } from "./modal.js";

const DATA_URL = "./data/attractions.json";

let allAttractions = [];
let state = loadState();

export async function initAttractionsPage() {
  const grid = qs("#attractions-grid");
  if (!grid) return;

  const filterEl = qs("#filter-type");
  if (filterEl) {
    filterEl.value = state.filter || "all";
    filterEl.addEventListener("change", () => {
      state.filter = filterEl.value;
      saveState(state);
      render(grid);
    });
  }

  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid JSON format: expected an array.");
    allAttractions = data;

    render(grid);
    bindGridEvents(grid);
  } catch (err) {
    grid.innerHTML = `
      <p class="error">
        Sorry, we couldn't load attractions right now. Please try again later.
      </p>`;
    console.error(err);
  }
}

function render(grid) {
  const filter = state.filter || "all";


  const filtered = allAttractions
    .filter(item => filter === "all" ? true : item.type === filter);


  grid.innerHTML = filtered.map(item => cardTemplate(item)).join("");

  // Optional count
  const countEl = qs("#results-count");
  if (countEl) countEl.textContent = `${filtered.length} results`;
}

function cardTemplate(item) {
  const img = safeUrl(item.image);
  const fav = isFavorite(state, item.id);


  return `
    <article class="card" data-id="${item.id}">
      <div class="card__media">
        <img
          src="${img}"
          alt="${item.name}"
          loading="lazy"
          width="640"
          height="420"
        />
      </div>

      <div class="card__body">
        <h3 class="card__title">${item.name}</h3>

        <ul class="card__meta">
          <li><strong>Type:</strong> ${item.type}</li>
          <li><strong>Location:</strong> ${item.location}</li>
          <li><strong>Altitude:</strong> ${formatMeters(item.altitude_m)}</li>
          <li><strong>Best season:</strong> ${item.best_season || "—"}</li>
        </ul>

        <div class="card__actions">
          <button class="btn btn--primary" data-action="details" type="button">
            More info
          </button>

          <button class="btn btn--ghost" data-action="favorite" type="button" aria-pressed="${fav}">
            ${fav ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function bindGridEvents(grid) {
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const card = btn.closest(".card");
    const id = card?.dataset?.id;
    if (!id) return;

    const action = btn.dataset.action;

    if (action === "details") {
      const item = allAttractions.find(a => a.id === id);
      if (!item) return;

      openModal({
        title: item.name,
        bodyHtml: modalTemplate(item)
      });
    }

    if (action === "favorite") {
      state = toggleFavorite(state, id);
      btn.setAttribute("aria-pressed", String(isFavorite(state, id)));
      btn.textContent = isFavorite(state, id) ? "★ Saved" : "☆ Save";
    }
  });
}

function modalTemplate(item) {
  const img = safeUrl(item.image);

  return `
    <div class="modal-content">
      <img
        src="${img}"
        alt="${item.name}"
        loading="lazy"
        width="900"
        height="520"
        style="max-width:100%; height:auto; border-radius:12px;"
      />
      <p style="margin-top:.75rem;">
        ${item.description}
      </p>

      <ul>
        <li><strong>Location:</strong> ${item.location}</li>
        <li><strong>Type:</strong> ${item.type}</li>
        <li><strong>Altitude:</strong> ${formatMeters(item.altitude_m)}</li>
        <li><strong>Best season:</strong> ${item.best_season || "—"}</li>
      </ul>

      ${item.tips ? `<p><strong>Travel tip:</strong> ${item.tips}</p>` : ""}
    </div>
  `;
}
