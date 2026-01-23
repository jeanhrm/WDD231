const cardsContainer = document.querySelector("#spotlight-cards");
const dataUrl = "data/members.json";

function levelName(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Bronze";
}

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function createSpotlightCard(member) {
  const card = document.createElement("article");
  card.classList.add("spotlight-card");

  const imgPath = `images/${member.image}`;

  card.innerHTML = `
    <h3>${member.name}</h3>
    <p class="muted">${member.industry}</p>
    <img src="${imgPath}" alt="${member.name} logo" loading="lazy" width="120" height="120">
    <p><strong>Membership:</strong> ${levelName(member.membershipLevel)}</p>
    <p><strong>Phone:</strong> ${member.phone}</p>
    <p><strong>Address:</strong> ${member.address}</p>
    <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
  `;

  return card;
}

async function loadSpotlights() {
  try {
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error("Failed to fetch members data.");
    const members = await res.json();

    const eligible = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    const count = Math.random() < 0.5 ? 2 : 3;
    const picks = shuffle(eligible).slice(0, count);

    cardsContainer.innerHTML = "";
    picks.forEach(member => cardsContainer.appendChild(createSpotlightCard(member)));
  } catch (err) {
    console.error(err);
    cardsContainer.textContent = "Spotlights unavailable.";
  }
}

loadSpotlights();
