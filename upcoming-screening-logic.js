// upcoming-screening-logic.js
export function getUpcomingScreenings(screenings, now = new Date()) {
  const fiveDaysFromNow = new Date(now);
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

  const upcomingScreenings = screenings.filter(screening => {
    const screeningDate = new Date(screening.date);
    return screeningDate >= now && screeningDate <= fiveDaysFromNow;
  });

 return upcomingScreenings
  .sort((a, b) => new Date(a.date) - new Date(b.date))
  .slice(0, 10);

}