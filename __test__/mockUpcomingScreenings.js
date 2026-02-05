const DAY = 24 * 60 * 60 * 1000;

export function makeMockScreeningsApi(screenings) {
  return {
    getUpcomingScreenings: async () => screenings,
  };
}

export const mockScreeningsApi = makeMockScreeningsApi([
  { title: "Visning inom 5 dagar", start_time: new Date(Date.now() + 2 * DAY).toISOString() },
  { title: "Visning efter 5 dagar", start_time: new Date(Date.now() + 8 * DAY).toISOString() },
]);
