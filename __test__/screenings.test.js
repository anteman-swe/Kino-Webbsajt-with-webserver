// Andreas

import { filterAndSortUpcomingScreenings } from "../server-api.js";

describe("filterAndSortUpcomingScreenings", () => {
  test("returnerar endast kommande visningar", () => {
    const now = new Date("2025-01-01T00:00:00.000Z");

    const mockScreenings = [
      { id: 1, attributes: { start_time: "2020-01-01T10:00:00.000Z", room: 1 } },
      { id: 2, attributes: { start_time: "2030-01-01T10:00:00.000Z", room: 2 } },
      { id: 3, attributes: { start_time: "2029-12-01T10:00:00.000Z", room: 3 } },
    ];

    const result = filterAndSortUpcomingScreenings(mockScreenings, now);

    expect(result).toHaveLength(2);
    expect(result.map(r => r.id)).toEqual([3, 2]);
  });

  test("sorterar stigande på start_time", () => {
    const now = new Date("2025-01-01T00:00:00.000Z");

    const mockScreenings = [
      { id: 10, attributes: { start_time: "2030-01-01T10:00:00.000Z", room: 1 } },
      { id: 11, attributes: { start_time: "2026-01-01T10:00:00.000Z", room: 2 } },
      { id: 12, attributes: { start_time: "2027-01-01T10:00:00.000Z", room: 3 } },
    ];

    const result = filterAndSortUpcomingScreenings(mockScreenings, now);

    expect(result.map(r => r.id)).toEqual([11, 12, 10]);
  });

  test("tom array ger tom array", () => {
    const now = new Date("2025-01-01T00:00:00.000Z");
    expect(filterAndSortUpcomingScreenings([], now)).toEqual([]);
  });
});
