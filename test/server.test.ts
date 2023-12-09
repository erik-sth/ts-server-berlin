import supertest, { SuperTest, Test } from 'supertest';
import { server } from '../src/server';
import mongoose from 'mongoose';

describe('Server Tests', () => {
    let app: SuperTest<Test>;

    beforeAll(() => {
        app = supertest(server);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    it('should respond with status 200 for the root route', async () => {
        const response = await app.get('/');
        expect(response.status).toBe(200);
    });
});
