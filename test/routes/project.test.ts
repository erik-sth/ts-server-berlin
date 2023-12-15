import supertest, { SuperTest, Test } from 'supertest';
import { server } from '../../src/server';
import { seedProjectRoute } from '../seed';
import { startDb, stopDB } from '../fakeDb';

describe('Project Routes Tests', () => {
    let app: SuperTest<Test>;
    let id = '';
    beforeAll(async () => {
        app = supertest(server);
        await startDb();
        seedProjectRoute();
    });

    afterAll(async () => {
        await stopDB();
        server.close();
    });

    it('should get projects when GET /:id', async () => {
        const response = await app.get('/project/65750b72771d33966c6da5cc');
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual('GetSpecialId');
        expect(response.body._id).toEqual('65750b72771d33966c6da5cc');
    });

    it('should create a project when POST /', async () => {
        const newProject = {
            name: 'Create/Delete-Event',
            idsThatAreRequiredForEveryone: ['solo5'],
            relatedPolls: ['id0', 'id1'],
            status: 'WaitingForWorker',
            reasonForFailing: '',
        };
        const response = await app.post('/project/').send(newProject);
        expect(response.status).toBe(200);
    });
    it('should get all projects', async () => {
        const response = await app.get('/project');
        expect(response.status).toBe(200);
        const projects = response.body;
        expect(projects.length).toBeGreaterThan(0);

        const testId = projects[1]._id;
        if (testId) id = testId;
    });
    it('should delete', async () => {
        const response = await app.delete('/project/' + id);
        expect(response.status).toBe(200);
    });
});
