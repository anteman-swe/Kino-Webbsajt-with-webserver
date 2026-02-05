const mockupApiMovies = {
  data: [
      {
        id: 6,
        title: "Forrest Gump",
        imdbId: "tt0109830",
        intro:
          "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        image: {
          url: "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_.jpg",
        },
        createdAt: "2023-03-12T17:06:09.208Z",
        updatedAt: "2026-01-15T12:46:01.032Z",
        publishedAt: "2023-03-12T17:06:16.643Z",
      },
      {
        id: 12,
        title: "The Godfather",
        imdbId: "tt0068646",
        intro:
          "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.\n\n",
        image: {
          url: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg",
        },
        createdAt: "2026-01-15T13:27:00.409Z",
        updatedAt: "2026-01-15T13:30:26.154Z",
        publishedAt: "2026-01-15T13:27:05.498Z",
      },
      {
        id: 2,
        title: "Encanto",
        imdbId: "tt2953050",
        intro:
          "<p>A Colombian teenage girl has to face the frustration of being <strong>the only member of her family</strong> without magical powers.</p>\n",
        image: {
          url: "https://m.media-amazon.com/images/M/MV5BOTY1YmU1ZTItMzNjZC00ZGU0LTk0MTEtZDgzN2QwOWVlNjZhXkEyXkFqcGc@._V1_.jpg",
        },
        createdAt: "2023-01-23T06:46:24.765Z",
        updatedAt: "2025-01-15T10:41:46.386Z",
        publishedAt: "2023-01-23T06:46:29.324Z",
      },
    ],
  meta: {page: 1, pageSize: 10, total: 3}
};

const mockupApiMovie = {
  id: 2,
  title: "Encanto",
  imdbId: "tt2953050", // Added
  poster: {
    url: "https://m.media-amazon.com/images/M/MV5BOTY1YmU1ZTItMzNjZC00ZGU0LTk0MTEtZDgzN2QwOWVlNjZhXkEyXkFqcGc@._V1_.jpg",
  },
  intro:
    "<p>A Colombian teenage girl has to face the frustration of being <strong>the only member of her family</strong> without magical powers.</p>\n",
  rating: { // Added to match new business logic
    rating: "4.5",
    source: "local",
    count: 10
  }
};

export const mockupApiMovieConverted = {
  id: 2,
  title: "Encanto",
  imdbId: "tt2953050", // Added to match simplifyMovieData output
  poster: {
    url: "https://m.media-amazon.com/images/M/MV5BOTY1YmU1ZTItMzNjZC00ZGU0LTk0MTEtZDgzN2QwOWVlNjZhXkEyXkFqcGc@._V1_.jpg",
  },
  intro:
    "<p>A Colombian teenage girl has to face the frustration of being <strong>the only member of her family</strong> without magical powers.</p>\n",
};

export const mockupCMSAnswer = {
  "data": {
    "id": 2,
    "attributes": {
      "title": "Encanto",
      "imdbId": "tt2953050",
      "intro": "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
      "image": {
        "url": "https://m.media-amazon.com/images/M/MV5BOTY1YmU1ZTItMzNjZC00ZGU0LTk0MTEtZDgzN2QwOWVlNjZhXkEyXkFqcGc@._V1_.jpg"
      },
      "createdAt": "2023-01-23T06:46:24.765Z",
      "updatedAt": "2025-01-15T10:41:46.386Z",
      "publishedAt": "2023-01-23T06:46:29.324Z"
    }
  },
  "meta": {}
};

const error404 = {
    status: 404,
    name: "NotFoundError",
    message: "Not Found",
    details: {},
};

export const mockupApi = {
  getAllMovies: async () => {
    return mockupApiMovies;
  },
  getOneMovie: async (id) => {
    if (id == 99){
        return error404;
    } else {
        mockupApiMovie.id = id;
        return mockupApiMovie;
    }
  }
};
