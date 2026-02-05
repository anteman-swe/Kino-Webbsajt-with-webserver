import { getUpcomingScreenings } from "./upcoming-screenings-logic.js";

export async function fetchUpcomingScreenings(api, movieId, now = new Date()) {
  const all = await api.getAllScreenings(); 
  const forMovie = (all || []).filter((s) => s.movie?.id === movieId);
  return getUpcomingScreenings(forMovie, now);
}

