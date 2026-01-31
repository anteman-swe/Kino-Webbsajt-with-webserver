// upcoming-screening-logic.js
export function getUpcomingScreenings(screenings, now = new Date()) {
  const fiveDaysFromNow = new Date(now);
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

  const upcomingScreenings = screenings.filter(screening => {
       const startTime = new Date(screening.startTime);
    return startTime >= now && startTime <= fiveDaysFromNow;
  });

 return upcomingScreenings
  .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))  
  .slice(0, 10); 

}