export function toggleLogin() {
  const modal = document.querySelector(".login-modal");
  const openBtn = document.querySelector(".header__login-btn");
  const closeBtn = document.querySelector(".login-modal__close");
  const cancelBtn = document.querySelector(".login-form__cancel");
  const form = document.querySelector(".login-form");
  const feedback = document.querySelector(".login-modal__feedback");
  const openRegisterBtn = document.querySelector(".open-register");
  const registerModal = document.querySelector(".register__modal");

  if (!modal || !openBtn || !form) return;

  function setFeedback(message, type = "") {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = "login-modal__feedback";
    if (type) {
      feedback.classList.add(type);
    }
  }

  function clearFeedback() {
    if (!feedback) return;
    feedback.textContent = "";
    feedback.className = "login-modal__feedback";
  }

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    clearFeedback();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    clearFeedback();
    form.reset();
  }

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (
      e.target === modal ||
      e.target.classList.contains("login-modal__dialog")
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (openRegisterBtn && registerModal) {
    openRegisterBtn.addEventListener("click", () => {
      closeModal();
      registerModal.style.display = "flex";
      registerModal.classList.add("register__modal--active");
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document
      .querySelector("#login-email")
      ?.value.trim()
      .toLowerCase();
    const password = document.querySelector("#login-password")?.value.trim();

    if (!email || !password) {
      setFeedback("Fyll i e-post och lösenord.", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("kinoUsers")) || [];

    const matchedUser = users.find((user) => {
      return (
        (user.email?.toLowerCase() === email ||
          user.username?.toLowerCase() === email) &&
        user.password === password
      );
    });

    if (matchedUser) {
      localStorage.setItem("kinoLoggedInUser", JSON.stringify(matchedUser));
      setFeedback("Inloggning lyckades!", "success");

      setTimeout(() => {
        closeModal();
        window.location.href = "/member-page";
      }, 700);
    } else {
      setFeedback("Fel e-post eller lösenord.", "error");
    }
  });
}

window.addEventListener("pageshow", () => {
  const modal = document.querySelector(".login-modal");
  if (modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }
  document.body.style.overflow = "";
});
