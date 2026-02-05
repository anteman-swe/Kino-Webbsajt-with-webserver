
//Upcoming screenings logic
 export function getUpcomingScreenings(screenings, now = new Date()) {

  const nowDate = Date ? now : new Date(now);
  const fiveDaysFromNow = new Date(nowDate);
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);


  return (screenings || [])
    .filter((s) => {
      const startStr = s?.start_time;     
      if (!startStr) return false;
      const start = new Date(startStr);
      return start >= nowDate && start <= fiveDaysFromNow;
    })
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
    .slice(0, 10);

}



