import { describe, expect, test } from '@jest/globals';
import convertMD2HTML from '../mdconversion.js';

describe('Unit-test: Conversion from MD to HTML', () => {
    test('Convert double star to strong',  () => {
        expect(convertMD2HTML('**Test**')).toMatch(/<strong>Test<\/strong>/);
    });

    test('Convert hashtag to h1', () => {
        expect(convertMD2HTML('# Headline')).toMatch(/<h1>Headline<\/h1>/);
    });
    test('Convert empty string to empty string', () => {
        expect(convertMD2HTML('')).toMatch("");
    });
});