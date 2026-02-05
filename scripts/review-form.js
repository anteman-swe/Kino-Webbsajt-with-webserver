document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  if (!form) return;

  // Extract movie ID from data attribute or URL
  let movieId = form.dataset.movieId;
  if (!movieId) {
    const match = window.location.pathname.match(/\/movies\/(\d+)/);
    movieId = match ? match[1] : null;
  }
  if (!movieId) return;

  // Kort 3: Handle form submit without page reload
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const messageEl = document.getElementById("review-message");

    try {
      const author = formData.get("author");
      const rating = formData.get("rating");
      const comment = formData.get("comment");

      // Validate
      if (!author || !rating) {
        if (messageEl) {
          messageEl.textContent = "Namn och betyg är obligatoriska.";
          messageEl.className = "review-message--error";
        }
        return;
      }

      // Prepare payload for server
      const reviewData = {
        author: author,
        rating: Number(rating),
        comment: comment || "",
        movie: movieId,
      };


      // Show success message
      if (messageEl) {
        messageEl.textContent = "Recension mottagen! (Klar för Kort 4: skicka till server)";
        messageEl.className = "review-message--success";
      }

      // Clear form
      form.reset();
    } catch (err) {
      if (messageEl) {
        messageEl.textContent = "Ett fel uppstod: " + err.message;
        messageEl.className = "review-message--error";
      }
    }
  });
});
