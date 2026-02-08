// upcoming-screenings-logic.js

export function filterUpcomingScreenings(screenings, now = new Date()) {
  const nowDate = now instanceof Date ? now : new Date(now);

  const endDate = new Date(nowDate);
  endDate.setDate(endDate.getDate() + 5);

  const getStartTime = (s) =>
    s?.start_time ??
    s?.startTime ??
    s?.attributes?.start_time ??
    null;

  return (screenings || [])
    .map((s) => {
      const startStr = getStartTime(s);
      const start = startStr ? new Date(startStr) : null;
      return { ...s, __startDate: start };
    })
    .filter((s) => s.__startDate && s.__startDate >= nowDate && s.__startDate <= endDate)
    .sort((a, b) => a.__startDate - b.__startDate)
    .slice(0, 10)
    .map(({ __startDate, ...rest }) => rest);
}
export function getUpcomingScreenings(screenings, now = new Date()) {
  return filterUpcomingScreenings(screenings, now);
}




