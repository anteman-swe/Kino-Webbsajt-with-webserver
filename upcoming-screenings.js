// upcoming-screening.js


export default function apiRouter(api) {
  const router = express.Router();
  router.get("/screenings", async (req, res) => {
    try {
      const cmsData = await api.getCMSData();
      const allScreenings = await api.getAllScreenings(cmsData);

      if (req.query.type === "upcoming") {
        return res.json(getUpcomingScreenings(allScreenings));
      }

      return res.json(allScreenings);
    } catch (err) {
      return res.status(500).json({ message: "Failed to load screenings" });
    }
  });

  return router;
}

