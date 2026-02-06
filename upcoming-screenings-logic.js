
//Upcoming screenings logic
 // Upcoming screenings logic (Moment 1)
export function getUpcomingScreenings(screenings, now = new Date()) {
  const nowDate = now instanceof Date ? now : new Date(now);

  // now + 5 days
  const endDate = new Date(nowDate);
  endDate.setDate(endDate.getDate() + 5);

  // Helper the function to pick start_time even if input happens to have a different structure
  const getStartTime = (s) =>
    s?.start_time ??
    s?.startTime ??
    s?.attributes?.start_time ??
    null;

  return (screenings || [])
    .map((s) => {
      const startStr = getStartTime(s);
      const start = startStr ? new Date(startStr) : null;

      return {
        ...s,
        start_time: startStr, // normalisation
        __startDate: start,   // internal sort/filter
      };
    })
    .filter((s) => s.__startDate && s.__startDate >= nowDate && s.__startDate <= endDate)
    .sort((a, b) => a.__startDate - b.__startDate)
    .slice(0, 10)
    .map(({ __startDate, ...rest }) => rest); // delet internal sort/filter

  }

