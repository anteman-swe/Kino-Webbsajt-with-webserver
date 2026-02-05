
//denna screening får inte framtida visningar
 export function getUpcomingScreenings(screenings, now = new Date()) {
  const nowDate = now instanceof Date ? now : new Date(now);
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

//Denna screening fungerar=> framtida visninga
// Function to filter and sort upcoming screenings
export function filterAndSortUpcomingScreenings(screeningsData, now = new Date()) {
  return screeningsData
    .filter((s) => {
      const start = new Date(s.attributes.start_time);
      return start > now;
    })
    .sort((a, b) => {
      const da = new Date(a.attributes.start_time).getTime();
      const db = new Date(b.attributes.start_time).getTime();
      return da - db;
    })
    .map(simplifyScreeningData);
}
// Function to clean and simplify a json-object with data about a screening
function simplifyScreeningData(oneScreening) {
  return {
    id: oneScreening.id,
    start_time: oneScreening.attributes.start_time,
    room: oneScreening.attributes.room ?? null
  };
}







