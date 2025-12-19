// Close Notice banner
const notice = document.querySelector(".notice");
const closeBtn = document.querySelector(".notice__close");

closeBtn.addEventListener("click", () => {
  notice.style.display = "none";
});