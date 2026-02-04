document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  if (!form) return;

  const movieId = form.dataset.movieId;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const formData = new FormData(form);

    const reviewData = {
      author: formData.get("author"),
      rating: formData.get("rating"),
      comment: formData.get("comment"),
      movieId: movieId,
    };
  });
});
