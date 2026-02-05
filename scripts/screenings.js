document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.querySelector("#screenings");
  const statusEl = document.querySelector("#screenings-status");
  if (!listEl || !statusEl) return;

  const movieId = listEl.dataset.movieId;

  try {
    const res = await fetch(`/movies/${movieId}/screenings`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const payload = await res.json();
    const screenings = payload.data;

    if (!Array.isArray(screenings) || screenings.length === 0) {
      statusEl.textContent = "Inga kommande visningar.";
      return;
    }

    statusEl.textContent = "";

    listEl.innerHTML = screenings
      .map((s) => {
        const d = new Date(s.start_time);
        const formatted = d.toLocaleString("sv-SE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });

        return `<li>${formatted}${s.room ? ` — Salong ${s.room}` : ""}</li>`;
      })
      .join("");
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Kunde inte ladda visningar.";
  }
});
