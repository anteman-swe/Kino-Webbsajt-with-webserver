import { describe, expect, test } from '@jest/globals';
import { mockupApiMovieConverted, mockupCMSAnswer } from './mockupApi.js';
import api from '../server-api.js';

describe('Does function handle simplifying?', () =>{
    test('Function converting input data to our output format', () => {
        expect(api.simplifyMovieData(mockupCMSAnswer.data)).toEqual(mockupApiMovieConverted);
    });
});