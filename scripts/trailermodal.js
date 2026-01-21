const modal = document.getElementById("trailerModal");
const iframe = document.getElementById("trailerIframe");
let closeBtn;
let backdrop;
if (modal) {
  closeBtn = modal.querySelector(".trailer-modal__close");
  backdrop = modal.querySelector(".trailer-modal__backdrop");
}


export function openTrailer(trailerId) {
  iframe.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1`;
  modal.classList.remove("hidden");
}

export function closeTrailer() {
  iframe.src = "";
  modal.classList.add("hidden");
}
if (closeBtn && backdrop) {
  closeBtn.addEventListener("click", closeTrailer);
  backdrop.addEventListener("click", closeTrailer);
}


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeTrailer();
});
