import { describe, expect, test } from '@jest/globals';
import request from "supertest";
import initServer from '../my-server.js';
import { mockupApi } from './mockupApi.js';

describe('Integration-test:  Movie API to HTML', () =>{
    const app = initServer(mockupApi);
    test('List of movies loading from API', async () =>{
        const response = await request(app)
            .get('/movies')
            .expect('content-type', /html/)
            .expect(200)
        
            expect(response.text).toContain('Forrest Gump');
            expect(response.text).toContain('The Godfather');
    });

    test('One movie is loading from API and showing correct title', async () => {
        const response = await request(app)
            .get('/movies/42')
            .expect('content-type', /html/)
            .expect(200)

            expect(response.text).toContain('<h1>Encanto</h1>');
            expect(response.text).toContain('<title>Encanto</title>');
    });
});
describe('Integration-test: Test server response when problems in API', () => {
    const app = initServer(mockupApi);
    test('Movie page doesnt exist, 404', async () => {
        const response = await request(app)
            .get('/movies/99')
            .expect('content-type', /html/)
            .expect(404);

            expect(response.text)
            .toContain('Filmen du försöker nå finns inte i filmlistan');
            expect(response.text).toContain('<title>Serverfel!</title>');
    });
});