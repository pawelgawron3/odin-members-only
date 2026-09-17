const joinClubBtn = document.querySelector("#join-club-btn");
const modal = document.querySelector("#join-club-modal");
const closeModalBtn = document.querySelector("#close-modal-btn");

joinClubBtn?.addEventListener("click", () => {
  modal.hidden = false;
});

closeModalBtn?.addEventListener("click", () => {
  modal.hidden = true;
});
