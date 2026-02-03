
 export function getUpcomingScreenings(screenings, now = new Date()) {
   
  const fiveDaysFromNow = new Date(now);
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

  return (screenings || [])
    .filter((s) => {
      const startStr = s?.start_time;     
      if (!startStr) return false;
      const start = new Date(startStr);
      return start >= now && start <= fiveDaysFromNow;
    })
    .sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
    .slice(0, 10);
}



