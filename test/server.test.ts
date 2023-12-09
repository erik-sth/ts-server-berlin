import supertest, { SuperTest, Test } from 'supertest';
import { server } from '../src/server';

describe('Server Tests', () => {
    let app: SuperTest<Test>;

    beforeAll( () => {
        app = supertest(server);
    });

    afterAll( () => {
        server.close();
    });

    it('should respond with status 200 for the root route', async () => {
        const response = await app.get('/');
        expect(response.status).toBe(200);
    });
});
