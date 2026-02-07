import Review from "/scripts/Review.js";

const oneMovieReviewsCont = document.querySelector(".reviews-one-movie");
const numberOfReviewsView = document.querySelector(".number-of-reviews");
let movie;
if (oneMovieReviewsCont) {
  movie = oneMovieReviewsCont.dataset.movieId;
}

const backButton = document.querySelector("#back-button");
const forwardButton = document.querySelector("#forward-button");

let noEndCheck = true;
let zeroCheck = false;
let page = 1;

document.addEventListener("DOMContentLoaded", async () => {
  if (oneMovieReviewsCont) {
    const oneMovieReviews = await getMovieReviews(movie, 1);
    numberOfReviewsView.textContent =
      "Totalt antal recensioner: " + oneMovieReviews.meta.total;
    renderReviews(oneMovieReviewsCont, oneMovieReviews);
    setButtons(oneMovieReviews.meta, forwardButton, backButton);
  }
});

if (backButton && forwardButton) {
  backButton.addEventListener("click", async () => {
    if (zeroCheck) {
      page--;
    }
    const oneMovieReviews = await getMovieReviews(movie, page);
    renderReviews(oneMovieReviewsCont, oneMovieReviews);
    setButtons(oneMovieReviews.meta, forwardButton, backButton);
  });

  forwardButton.addEventListener("click", async () => {
    if (noEndCheck) {
      page++;
    }
    const oneMovieReviews = await getMovieReviews(movie, page);
    renderReviews(oneMovieReviewsCont, oneMovieReviews);
    setButtons(oneMovieReviews.meta, forwardButton, backButton);
  });
}

export async function getMovieReviews(movieID, page) {
  const getReviewsString = "/movies/" + movieID + "/reviews?page=" + page;
  try {
    const response = await fetch(getReviewsString);
    if (!response.ok) {
      // TODO: What should happen if there is error with fetch?
    } else {
      const reviewsResponse = await response.json();
      return reviewsResponse;
    }
  } catch (err) {
    throw new Error(`Error message: ${err.message}`);
  }
}

function renderReviews(tagPointer, reviewsContent) {
  zeroCheck = reviewsContent.meta.page > 1;
  noEndCheck =
    reviewsContent.meta.total >
    reviewsContent.meta.pageSize * reviewsContent.meta.page;
  tagPointer.innerHTML = "";
  reviewsContent.data.forEach((item) => {
    const reviewToAppend = new Review(item).render();
    tagPointer.appendChild(reviewToAppend);
  });
}

function setButtons(metaIn, fb, bb) {
  if (metaIn.total / metaIn.pageSize > metaIn.page) {
    fb.removeAttribute("disabled");
    fb.setAttribute("enabled", "");
  } else {
    fb.removeAttribute("enabled");
    fb.setAttribute("disabled", "");
  }
  if (metaIn.page > 1) {
    bb.removeAttribute("disabled");
    bb.setAttribute("enabled", "");
  } else {
    bb.removeAttribute("enabled");
    bb.setAttribute("disabled", "");
  }
}
