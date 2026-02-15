const KEY = "dh_settings_v1";

const defaultState = {
  filter: "all",        
  favorites: []        
};

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);


    return {
      filter: typeof parsed.filter === "string" ? parsed.filter : defaultState.filter,
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : []
    };
  } catch (err) {

    return { ...defaultState };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function toggleFavorite(state, id) {
  const favs = new Set(state.favorites);
  if (favs.has(id)) favs.delete(id);
  else favs.add(id);
  state.favorites = [...favs];
  saveState(state);
  return state;
}

export function isFavorite(state, id) {
  return state.favorites.includes(id);
}
