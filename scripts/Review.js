export default class Review {
  constructor(data) {
    this.data = data;
  }

  render() {
    const reviewCard = document.createElement("li");
    reviewCard.classList.add("review-card");

    const reviewText = document.createElement("p");
    reviewText.classList.add("review-card__text");
    if (this.data.comment) {
      reviewText.textContent = this.data.comment;
    } else {
      reviewText.textContent = "No comment added by reviewer";
    }

    const reviewRating = document.createElement("span");
    reviewRating.classList.add("review-card__rating");
    let ratingStars = "";
    if (this.data.rating) {
      for (let i = 1; i <= this.data.rating; i++) {
        ratingStars = ratingStars + "⭐";
      }
    } else {
      ratingStars = "🍅  No rating added by user";
    }
    reviewRating.textContent = ratingStars;

    const reviewAuthor = document.createElement("p");
    reviewAuthor.classList.add("review-card__revauthor");

    const reviewedBy = document.createElement("span");
    reviewedBy.classList.add("review-card__preauthor");
    reviewedBy.textContent = "Review By: ";

    const author = document.createElement("span");
    author.classList.add("review-card__author");
    if (this.data.author) {
      author.textContent = this.data.author;
    } else {
      author.textContent = "No user alias provided...";
    }

    const revDate = document.createElement("p");
    revDate.classList.add('review-card__date')
    const updated = this.data.updatedAt.split("T");
    const outDate = updated[0];
    revDate.textContent = "Review date: " + outDate;

    reviewAuthor.appendChild(reviewedBy);
    reviewAuthor.appendChild(author);

    reviewCard.append(reviewText);
    reviewCard.append(reviewRating);
    reviewCard.append(reviewAuthor);
    reviewCard.append(revDate);
    return reviewCard;
  }
}
