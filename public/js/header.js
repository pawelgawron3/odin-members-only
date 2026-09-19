const joinClubBtn = document.querySelector("#join-club-btn");
const joinClubModal = document.querySelector("#join-club-modal");
const closeModalBtn = document.querySelector("#close-modal-btn");

joinClubBtn?.addEventListener("click", () => {
  joinClubModal.hidden = false;
});

closeModalBtn?.addEventListener("click", () => {
  joinClubModal.hidden = true;
});

const becomeAdminBtn = document.querySelector("#become-admin-btn");
const adminModal = document.querySelector("#admin-modal");
const closeAdminModalBtn = document.querySelector("#close-admin-modal-btn");

becomeAdminBtn?.addEventListener("click", () => {
  adminModal.hidden = false;
});

closeAdminModalBtn?.addEventListener("click", () => {
  adminModal.hidden = true;
});
