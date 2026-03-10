const config = {
  apiUrl:
    window.location.hostname === "localhost"
      ? "http://localhost:5080"
      : "https://kino-webb-809892640227.europe-north2.run.app",
};

export default config;
