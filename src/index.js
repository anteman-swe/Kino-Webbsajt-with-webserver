import { fetchUpcomingScreenings, renderUpcomingScreenings } from "../scripts/upcomingScreenings.js";
import { initMemberPage, initMemberButtons } from "/scripts/member-page.js";
import { toggleLogin } from "/scripts/login.js";
import { toggleRegister, initSignup } from "/scripts/register.js"; // Lade till initSignup här
import { toggleMenu } from "/scripts/menu.js";
import { closeNotice } from "/scripts/notice.js";
import { toggleTheme } from "/scripts/tema.js";
import { fetchMovies } from "/scripts/api.js";
import { renderMovieList } from "/scripts/createcard.js";
import { openTrailer } from "/scripts/trailermodal.js";
import { movieCarousel } from "/scripts/carousel.js";
import { fetchPopularMovies, renderPopularMovies } from "/scripts/popularMovies.js";
import "/scripts/oneMovieReviews.js";
import "/scripts/review-form.js";

function parseDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? null : d;
}

function isUpcoming(movie) {
  const d = parseDate(movie.Show_Date);
  if (!d) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d > today;
}

// SLOG IHOP TILL EN LYSSNARE FÖR ATT UNDVIKA KROCKAR
document.addEventListener("DOMContentLoaded", async () => {
  // Initiera UI-funktioner
  toggleLogin();
  toggleRegister();
  initSignup(); // Kör din nya registreringslogik
  toggleMenu();
  closeNotice();
  toggleTheme();
  initMemberButtons();

  if (document.querySelector(".members__offers")) {
    initMemberPage();
  }

  const currentTrack = document.getElementById("currentMoviesTrack");
  const comingSoonTrack = document.getElementById("comingSoonTrack");
  const eventsTrack = document.getElementById("eventsTrack");

  // Visa laddningstext
  if (currentTrack) currentTrack.innerHTML = "<p>Laddar…</p>";
  if (comingSoonTrack) comingSoonTrack.innerHTML = "<p>Laddar…</p>";
  if (eventsTrack) eventsTrack.innerHTML = "<p>Laddar…</p>";

  try {
    // Hämta all data
    const screeningsRes = await fetch("/api/screenings");
    const screeningsJson = await screeningsRes.json();
    const popularMovies = await fetchPopularMovies();
    const allMovies = await fetchMovies();

    // Rendera data
    renderUpcomingScreenings(screeningsJson.screenings);
    renderPopularMovies(popularMovies);
    
    // Starta karusellen
    movieCarousel(allMovies);

    const upcoming = allMovies.filter(isUpcoming);
    const current = allMovies.filter((m) => !isUpcoming(m));

    renderMovieList(currentTrack, current.slice(0, 20));
    renderMovieList(comingSoonTrack, upcoming.slice(0, 10));
    renderMovieList(eventsTrack, current.slice(0, 10));

    // Klickhantering för Trailer
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest(".movies-carousel__button");
      if (!btn) return;

      if (btn.textContent === "Trailer") {
        const movieId = Number(btn.dataset.id);
        const movie = allMovies.find((m) => m.id === movieId);

        if (!movie?.Trailer_Id) {
          alert("Trailer saknas");
          return;
        }
        openTrailer(movie.Trailer_Id);
      }
    });

  } catch (err) {
    console.error(err);
    const msg = `<p class="empty_state">Kunde inte hämta data: ${err.message}</p>`;
    if (currentTrack) currentTrack.innerHTML = msg;
    if (comingSoonTrack) comingSoonTrack.innerHTML = msg;
  }
});