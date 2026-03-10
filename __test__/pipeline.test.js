import { describe, expect, test } from '@jest/globals';

// Simple test to see that Jest is working in the pipeline
describe('Initial Pipeline Check', () =>{
    test('This should verify that math still works', () => {
        const sum = 2 + 2;
        expect(sum).toBe(4);
    });
});