// upcoming-screening-logic.js

export function getUpcomingScreenings(screenings, now = new Date()) {
  const fiveDaysFromNow = new Date(now);
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

  return (screenings || [])
    .filter(s => {
      const startStr = s?.attributes?.start_time;   
      if (!startStr) return false;
      const start = new Date(startStr);
      return start >= now && start <= fiveDaysFromNow;
    })
    .sort((a, b) => new Date(a.attributes.start_time) - new Date(b.attributes.start_time))
    .slice(0, 10);
}




