export function toggleLogin() {
  const modal = document.querySelector(".login_modal");
  const openBtn = document.querySelector(".header__login-btn");
  const closeBtn = document.querySelector(".login_close");
  const form = document.querySelector(".login_form");

  if (!modal || !openBtn || !closeBtn || !form) return;

  modal.style.display = "none";

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    window.location.href = "/member-page";
  });
}



/*export function toggleLogin() {
    const modal = document.querySelector('.login__modal');
    const openBtn = document.querySelector('.header__login-btn');
    
     if (!openBtn || !modal) return;

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });
          /*if (!openBtn) return;
       openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "member-page.html";
  });*/
    /*const closeBtn = document.querySelector('.login__close');
    const submit = document.querySelector('.login__submit');

  
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    submit.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "member-page.html"; 
    });
}
*/