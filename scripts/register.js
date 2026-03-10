// Hanterar öppning och stängning av registreringsfönstret
 
export function toggleRegister() {
  const modal = document.querySelector('.register__modal');
  const openBtn = document.querySelector('.open-register');
  const closeBtn = document.querySelector('.register__close');

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    modal.style.display = 'flex'; 
    modal.classList.add('register__modal--active');
  });

  const closeModal = () => {
    modal.style.display = 'none';
    modal.classList.remove('register__modal--active');
  };

  closeBtn.addEventListener('click', closeModal);

  // Stäng om man klickar utanför innehållet
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Hanterar logik för lösenordsstyrka och lagring i Local Storage

export function initSignup() {
  const form = document.getElementById('signupForm');
  const passwordInput = document.getElementById('passwordInput');
  const strengthBar = document.getElementById('passwordStrength');
  const strengthText = document.getElementById('strengthText');
  const modal = document.querySelector('.register__modal');

  if (!form || !passwordInput) return;

  // Indikator för lösenordsstyrka
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 0;

    if (val.length > 6) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    const colors = ['#ff4b2b', '#ffa502', '#2ed573', '#1e90ff'];
    const labels = ['Svagt', 'Okej', 'Bra', 'Mycket starkt'];

    if (val.length === 0) {
      strengthBar.style.width = '0%';
      strengthText.textContent = '';
    } else {
      strengthBar.style.width = (strength + 1) * 20 + '%';
      strengthBar.style.backgroundColor = colors[strength] || colors[0];
      strengthText.textContent = labels[strength] || labels[0];
    }
  });

  // Hantera Submit och Local Storage
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    // Hämta befintliga användare från Local Storage
    const users = JSON.parse(localStorage.getItem('kinoUsers') || '[]');
    
    // Kolla om e-posten redan finns
    if (users.find(u => u.email === userData.email)) {
      alert('E-posten är redan registrerad!');
      return;
    }

    // Spara användaren
    users.push(userData);
    localStorage.setItem('kinoUsers', JSON.stringify(users));

    alert('Konto skapat! Välkommen till Kino.');

    // RENSA OCH STÄNG 
    form.reset();
    if (strengthBar) strengthBar.style.width = '0%';
    if (strengthText) strengthText.textContent = '';
    
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('register__modal--active');
    }
  });
}