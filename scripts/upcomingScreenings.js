// scripts/upcomingScreenings.js
export async function fetchUpcomingScreenings(movieId) {
  const res = await fetch(`/api/movies/${movieId}/screenings`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.screenings || [];
}

export function renderUpcomingScreenings(screenings) {
  const container = document.getElementById("upcoming_screenings_list");
  container.innerHTML = "";

  if (!screenings?.length) {
    container.innerHTML = "<p>Inga kommande visningar.</p>";
    return;
  }

  screenings.forEach((s) => {
    const start = new Date(s.start_time).toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="upcoming-screenings__card">
        <img class="upcoming-screenings__img" src="${s.movie?.imageUrl ?? ""}" alt="${s.movie?.title ?? "Film"}">
        <h3 class="upcoming-screenings__title">${s.movie?.title ?? "Visning"}</h3>
        <p class="upcoming-screenings__time">${start}</p>
        <p class="upcoming-screenings__room">${s.room ?? ""}</p>
      </div>
      `
    );

  });
}