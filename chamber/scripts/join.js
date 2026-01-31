const ts = document.querySelector("#timestamp");
if (ts) {
  ts.value = new Date().toISOString();
}

const modalButtons = document.querySelectorAll("[data-modal]");
modalButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-modal");
    const dialog = document.getElementById(id);
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  });
});

document.querySelectorAll("dialog [data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dialog = btn.closest("dialog");
    dialog?.close();
  });
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedInDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!clickedInDialog) dialog.close();
  });
});
