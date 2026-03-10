/**
 * @jest-environment jsdom
 */

import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { mockupReviews } from './mockupApi.js';
import { getMovieReviews } from '../scripts/oneMovieReviews.js';

global.fetch = jest.fn();

describe('Test function to get Reviews for one movie', () => {
    beforeEach(() =>{
        fetch.mockClear();
    });
    test('Test for getting first 5 reviews', async () => {
        const mockReviews = mockupReviews;
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockReviews,
        });

        const result = await getMovieReviews(8,42);

        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/movies/8/reviews?page=42'));
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(result.data[0].id).toBe(1);
        expect(result.data[4].comment).toContain('Review 5');
        expect(result.meta.page).toBe(1);
        expect(result.meta.total).toBe(27);
    });
});