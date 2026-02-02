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
    reviewAuthor.classList.add("review-card__author");
    if (this.data.author) {
      reviewAuthor.textContent = this.data.author;
    } else {
      reviewAuthor.textContent = "No user alias provided...";
    }

    reviewCard.append(reviewText);
    reviewCard.append(reviewRating);
    reviewCard.append(reviewAuthor);

    return reviewCard;
  }
}
