import { describe, expect, test } from '@jest/globals';
import request from "supertest";
import initServer from '../my-server.js';
import { mockupApi } from './mockupApi.js';

describe('Movie API', () =>{
    const app = initServer(mockupApi);
    test('List of movies loading from API', async () =>{
        const response = await request(app)
            .get('/movies')
            .expect('Content-Type', /html/)
            .expect(200)
        
            expect(response.text).toContain('Forrest Gump');
            expect(response.text).toContain('The Godfather');
    });

    test('One movie is loading from API and showing correct title', async () => {
        const response = await request(app)
            .get('/movies/42')
            .expect('Content-Type', /html/)
            .expect(200)

            expect(response.text).toContain('<h1>Encanto</h1>');
            expect(response.text).toContain('<title>Encanto</title>');
    });
});