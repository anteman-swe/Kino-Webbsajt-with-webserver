import { fetchMovies } from "./api.js";

export async function movieCarousel() {
    const currentTrack = document.getElementById('currentMoviesTrack');
    const upcomingTrack = document.getElementById('comingSoonTrack');
    const eventsTrack = document.getElementById('eventsTrack');
    const heroInner = document.querySelector('.carousel_inner');
    const daySelector = document.getElementById('dayFilter'); 

    // Cache to store movies for each day
    const dailyMovieCache = {};

    try {
        const movieData = await fetchMovies();

        if (!movieData || !Array.isArray(movieData)) {
            console.error("No movie data found");
            return;
        }

        const getAgeCategory = (certificate) => {
            if (!certificate) return { category: null, class: null };
            if (certificate === 'A' || certificate === 'R') {
                return { category: 'Adult', class: 'adults-only' };
            } else if (certificate === 'U' || certificate === 'UA' || certificate === 'PG-13') {
                return { category: 'Children', class: 'for-children' };
            } else {
                return { category: certificate, class: 'other-rating' };
            }
        };

        const heroMovies = [...movieData].sort(() => Math.random() - 0.5).slice(0, 6);
        heroInner.innerHTML = heroMovies.map((movie, index) => {
            const { category, class: categoryClass } = getAgeCategory(movie.Certificate);
            return `
            <div class="carousel_slide ${index === 0 ? 'active' : ''}" style="background-image: url('${movie.Poster_Link}')">
                <div class="slide_content">
                    <h1 class="film_title">${movie.Series_Title}</h1>
                    <div class="festival_dates">
                        <h2>Released: ${movie.Released_Year}</h2>
                        <h3>${category ? `<span class="certificate-badge ${categoryClass}">${category}</span>` : ''}</h3>
                    </div>
                </div>
            </div>`;
        }).join('');

        const generateMovieHTML = (data, showDays, prefix) => {
            return data.map((movie, index) => {
                const { category, class: categoryClass } = getAgeCategory(movie.Certificate);
                return `
                    <div class="movie-wrapper">
                        <div class="movie-card">
                            <img src="${movie.Poster_Link}" alt="${movie.Series_Title}">
                            <div class="card-footer">
                                <span class="trailer-btn" data-trailer="${movie.Trailer}">
                                    <i class="fas fa-play"></i> Trailer
                                </span>
                                <span class="details-btn" data-prefix="${prefix}" data-id="${movie.id}">Detaljer ▼</span>
                            </div>
                            <div class="movie-details-content" id="${prefix}-details-${movie.id}" style="display: none;">
                                <p><strong>Rating:</strong> ⭐ ${movie.IMDB_Rating}</p>
                                <p><strong>Grupp:</strong> ${category ? `<span class="certificate-badge ${categoryClass}">${category}</span>` : ''}</p>
                                <p><strong>År:</strong> ${movie.Released_Year}</p>
                                <p><strong>Regissör:</strong> ${movie.Director}</p>
                                <p><strong>Handling:</strong> ${movie.Overview}</p>
                            </div>
                        </div>
                    </div>`}).join('');
        };

       
        const updateCurrentMovies = (filterDay) => {
            // Check if we already have movies saved for this specific day
            if (!dailyMovieCache[filterDay]) {
                // If not, create a random selection and save it in the cache
                dailyMovieCache[filterDay] = [...movieData].sort(() => Math.random() - 0.5).slice(0, 5);
            }

            // Use the movies stored in the cache for this day
            const filtered = dailyMovieCache[filterDay];
            
            if (currentTrack) {
                currentTrack.innerHTML = generateMovieHTML(filtered, true, 'current');
                setupDetailsListeners(); 
            }
        };

        if (daySelector) {
            daySelector.addEventListener('click', (e) => {
                const btn = e.target.closest('.day-btn');
                if (!btn) return;

                document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                updateCurrentMovies(btn.dataset.day);
            });
        }

        updateCurrentMovies("Idag"); 

        const shuffledUpcoming = [...movieData].sort(() => Math.random() - 0.5).slice(5, 10);
        if (upcomingTrack) upcomingTrack.innerHTML = generateMovieHTML(shuffledUpcoming, false, 'upcoming');

        if (eventsTrack) {
            const shuffledEvents = [...movieData].sort(() => Math.random() - 0.5).slice(0, 5);
            eventsTrack.innerHTML = shuffledEvents.map(movie => `
                <div class="event_card">
                    <img src="${movie.Poster_Link}" alt="${movie.Series_Title}">
                </div>`).join('');
        }

        setupDetailsListeners();

    } catch (error) {
        console.error("Movie Carousel Error:", error);
    }
}

function setupDetailsListeners() {
    document.removeEventListener('click', handleDetailClick);
    document.addEventListener('click', handleDetailClick);
}

function handleDetailClick(e) {
    if (e.target.classList.contains('details-btn')) {
        const movieId = e.target.getAttribute('data-id');
        const prefix = e.target.getAttribute('data-prefix');
        const detailsDiv = document.getElementById(`${prefix}-details-${movieId}`);

        if (detailsDiv) {
            const isHidden = detailsDiv.style.display === 'none';
            detailsDiv.style.display = isHidden ? 'block' : 'none';
            e.target.innerHTML = isHidden ? 'Detaljer ▲' : 'Detaljer ▼';
        }
    }
}