// src/scripts/index.js

console.log("✅ index.js loaded");

import { fetchMovies } from "./api.js";
import { renderMovieList } from "./createcard.js";
import { openTrailer } from "./trailermodal.js";
import { toggleTheme, closeBanner } from "./tema.js";

// Styles: vi importerar bara "main.scss" som i sin tur @use:ar footer osv.
import "../sections/main.scss";

// UI
import { toggleLogin } from "./login.js";
import { toggleRegister } from "./register.js";
import { toggleMenu } from "./menu.js";
import { closeNotice } from "./notice.js";

// Valfritt (bara om du har dessa moduler och använder dem i HTML)
// import { toggleTheme, closeBanner } from "./tema.js";
// import { movieCarousel } from "./carousel.js";
// import { changeHeroSlide } from "./movieEventSlider.js";

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

function setLoading(trackEl) {
  if (trackEl) trackEl.innerHTML = "<p>Laddar…</p>";
}

function setError(trackEl, err) {
  if (trackEl) {
    trackEl.innerHTML = `<p class="empty_state">Kunde inte hämta filmer: ${err?.message ?? err}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Init UI
  try {
    toggleLogin();
    toggleRegister();
    toggleMenu();
    closeNotice();
    toggleTheme();
    closeBanner();
  } catch (e) {
    console.warn("UI init warning:", e);
  }

  // Valfritt theme/banner
  // try {
  //   closeBanner?.();
  //   toggleTheme?.();
  // } catch (e) {
  //   console.warn("Theme/banner init warning:", e);
  // }

  // Valfritt hero-carousel
  // try {
  //   await movieCarousel?.();
  //   changeHeroSlide?.(0);
  //   const heroPrev = document.querySelector(".carousel_control.prev");
  //   const heroNext = document.querySelector(".carousel_control.next");
  //   if (heroPrev && heroNext) {
  //     heroPrev.addEventListener("click", () => changeHeroSlide(-1));
  //     heroNext.addEventListener("click", () => changeHeroSlide(1));
  //   }
  // } catch (e) {
  //   console.warn("Carousel init warning:", e);
  // }

  const currentTrack = document.getElementById("currentMoviesTrack");
  const comingSoonTrack = document.getElementById("comingSoonTrack");
  const eventsTrack = document.getElementById("eventsTrack");

  setLoading(currentTrack);
  setLoading(comingSoonTrack);
  setLoading(eventsTrack);

  let movies = [];

  try {
    movies = await fetchMovies();

    const upcoming = movies.filter(isUpcoming);
    const current = movies.filter((m) => !isUpcoming(m));

    renderMovieList(currentTrack, current.slice(0, 10));
    renderMovieList(comingSoonTrack, upcoming.slice(0, 10));
    renderMovieList(eventsTrack, current.slice(0, 10)); // placeholder
  } catch (err) {
    console.error(err);
    setError(currentTrack, err);
    setError(comingSoonTrack, err);
    setError(eventsTrack, err);
    return;
  }

  // Trailer-knapp (delegation)
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".movies-carousel__button");
    if (!btn) return;

    if (btn.textContent?.trim() !== "Trailer") return;

    const movieId = Number(btn.dataset.id);
    const movie = movies.find((m) => Number(m.id) === movieId);

    if (!movie?.Trailer_Id) {
      alert("Trailer saknas");
      return;
    }

    openTrailer(movie.Trailer_Id);
  });
});
