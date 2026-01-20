import { describe, expect, test } from '@jest/globals';
import request from "supertest";
import initServer from '../my-server.js';

describe('Movie list page', () =>{
    test('List of movies loading from API', async () =>{
        await request()
    });
});