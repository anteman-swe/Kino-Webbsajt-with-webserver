document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  if (!form) return;

  let movieId = form.dataset.movieId;
  if (!movieId) {
    const match = window.location.pathname.match(/\/movies\/(\d+)/);
    movieId = match ? match[1] : null;
  }
  if (!movieId) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const messageEl = document.getElementById("review-message");

    try {
      const author = formData.get("author");
      const rating = formData.get("rating");
      const comment = formData.get("comment");

      if (!author || !rating) {
        if (messageEl) {
          messageEl.textContent = "Namn och betyg är obligatoriska.";
          messageEl.className = "review-message--error";
        }
        return;
      }

      const response = await fetch(`/movies/${movieId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({
          author,
          rating: Number(rating),
          comment: comment || "",
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => null);
        throw new Error(errJson?.error || `${response.status} ${response.statusText}`);
      }

      await response.json();

      if (messageEl) {
        messageEl.textContent = "Recension skickad! Tack för din feedback.";
        messageEl.className = "review-message--success";
      }

      form.reset();
    } catch (err) {
      if (messageEl) {
        messageEl.textContent = "Fel vid skickning: " + (err.message || "Okänt fel");
        messageEl.className = "review-message--error";
      }
    }
  });
});
