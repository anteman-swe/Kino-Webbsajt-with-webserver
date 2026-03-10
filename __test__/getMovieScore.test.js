import { jest } from '@jest/globals'; // Add this line
import { getMovieScore } from '../server-api.js'; 

global.fetch = jest.fn();

// Mocking the global fetch
global.fetch = jest.fn();

describe('getMovieScore Logic', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should return local average when there are 5 or more reviews', async () => {
    // 1. Mock the first fetch (Local Reviews)
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          { attributes: { rating: 5 } },
          { attributes: { rating: 4 } },
          { attributes: { rating: 4 } },
          { attributes: { rating: 3 } },
          { attributes: { rating: 5 } }
        ]
      }),
    });

    const result = await getMovieScore('tt0110912');

    expect(result.source).toBe('local');
    expect(result.rating).toBe('4.2'); // (5+4+4+3+5) / 5 = 4.2
    expect(result.count).toBe(5);
  });

  test('should fallback to IMDb when there are fewer than 5 reviews', async () => {
    // 1. Mock first fetch: only 2 reviews
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [{ attributes: { rating: 5 } }, { attributes: { rating: 4 } }]
      }),
    });

    // 2. Mock second fetch: IMDb API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        rating: { aggregateRating: '8.9' }
      }),
    });

    const result = await getMovieScore('tt0110912');

    expect(result.source).toBe('imdb');
    expect(result.rating).toBe('8.9');
    expect(result.count).toBe(2);
  });

  test('should return N/A if fetch fails', async () => {
    fetch.mockRejectedValue(new Error('Network Error'));

    const result = await getMovieScore('tt0110912');

    expect(result.rating).toBe('N/A');
    expect(result.source).toBe('none');
  });
});