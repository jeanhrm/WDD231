const membersEl = document.querySelector("#members");
const gridBtn = document.querySelector("#grid");
const listBtn = document.querySelector("#list");

async function getMembers() {
  const res = await fetch("./data/members.json");
  if (!res.ok) throw new Error("Failed to load members.json");
  return await res.json();
}

function setActive(btnOn, btnOff) {
  btnOn.classList.add("is-active");
  btnOff.classList.remove("is-active");
}

function setView(mode) {
  membersEl.classList.remove("grid", "list");
  membersEl.classList.add(mode);
}

function renderMembers(data, mode) {
  membersEl.innerHTML = "";
  setView(mode);

  data.forEach((m) => {
    const card = document.createElement("article");
    card.className = "member";

    const img = document.createElement("img");
    img.src = `images/${m.image}`;
    img.alt = m.name;
    img.loading = "lazy";
    img.width = 320;
    img.height = 200;

    const h2 = document.createElement("h2");
    h2.textContent = m.name;

    const meta = document.createElement("div");
    meta.className = "member-meta";

    const addr = document.createElement("p");
    addr.textContent = m.address;

    const phone = document.createElement("p");
    phone.textContent = m.phone;

    const link = document.createElement("a");
    link.href = m.website;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = m.website.replace("https://", "");

    const level = document.createElement("p");
    level.className = "badge";
    level.textContent =
      m.membershipLevel === 3 ? "Gold" : m.membershipLevel === 2 ? "Silver" : "Member";

    meta.append(addr, phone, link, level);
    card.append(img, h2, meta);
    membersEl.append(card);
  });
}

function setFooterDates() {
  const yearEl = document.querySelector("#year");
  const modEl = document.querySelector("#lastModified");
  yearEl.textContent = new Date().getFullYear();
  modEl.textContent = document.lastModified;
}

(async function init() {
  try {
    const members = await getMembers();
    renderMembers(members, "grid");

    gridBtn.addEventListener("click", () => {
      setActive(gridBtn, listBtn);
      renderMembers(members, "grid");
    });

    listBtn.addEventListener("click", () => {
      setActive(listBtn, gridBtn);
      renderMembers(members, "list");
    });

    setFooterDates();
  } catch (e) {
    membersEl.innerHTML = "<p>Unable to load the directory data.</p>";
    setFooterDates();
  }
})();
