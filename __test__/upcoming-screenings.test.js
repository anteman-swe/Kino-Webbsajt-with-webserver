import { describe, expect, it } from '@jest/globals';
import { getUpcomingScreenings } from "../upcoming-screenings-logic.js";
import { mockScreeningsApi } from './mockUpcomingScreenings.js';


describe("getUpcomingScreenings", () => {
  it("Filters out screenings with start_time newer than 5 days", async () => {
    const screenings = await mockScreeningsApi.getUpcomingScreenings(); 
    const result = getUpcomingScreenings(screenings, new Date());

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Visning inom 5 dagar");
  });

 });

it("Returns max 10 screenings within 5 days when more exist", () => {
  const DAY = 24 * 60 * 60 * 1000;
  const now = new Date();

  const screenings = Array.from({ length: 12 }, (_, i) => ({
    title: `view ${i + 1}`,
    start_time: new Date(now.getTime() + ((i % 5) + 1) * DAY),
  }));

  const result = getUpcomingScreenings(screenings, now);

  expect(result).toHaveLength(10);
});

it("Excludes screenings in the past", () => {
  const DAY = 24 * 60 * 60 * 1000;
  const now = new Date();

  const screenings = [
    { title: "past", start_time: new Date(now.getTime() - 1 * DAY)},
    { title: "future", start_time: new Date(now.getTime() + 1 * DAY) },
  ];

  const result = getUpcomingScreenings(screenings, now);

  expect(result.map(s => s.title)).toEqual(["future"]);
});


