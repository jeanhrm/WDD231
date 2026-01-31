const params = new URLSearchParams(window.location.search);

const data = {
  "First Name": params.get("fname") || "",
  "Last Name": params.get("lname") || "",
  "Email": params.get("email") || "",
  "Mobile Phone": params.get("phone") || "",
  "Business / Organization": params.get("org") || "",
  "Timestamp": params.get("timestamp") || ""
};

const container = document.querySelector("#submitted");

if (container) {
  const ul = document.createElement("ul");
  ul.classList.add("submitted-list");

  Object.entries(data).forEach(([label, value]) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${label}:</strong> ${value ? value : "<em>Not provided</em>"}`;
    ul.appendChild(li);
  });

  container.appendChild(ul);
}
