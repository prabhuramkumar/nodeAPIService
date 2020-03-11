let server;
const request = require('supertest');
const {genereModel, validateName} = require('../models/genereModel');
const {userModel} = require('../models/userModel');

describe('/api/genere', () => {
    beforeEach(() => {
        server = require('../index');
    });
    afterEach(async() => {
        server.close();
        await genereModel.remove({});
    });
    describe('get/', () => {
        it('should return all generes', async () => {
            await genereModel.collection.insertMany([{'name': 'genere1'}, {'name': 'genere2'}]);
            const res = await request(server).get('/api/generes');
            expect(res.body.length).toBe(2);
            expect(res.body[0].name).toBe('genere1');
        });
    });

    describe('post/', () => {
        it('should return 401 if client is not logged in', async () => {
            const res = await request(server).post('/api/generes').send({'name': "genere1"});
            expect(res.status).toBe(401);
        });

        it('should return 403 if looged in but not a an admin', async () => {
            const token = new userModel().generateAuthToken();
            const res = await request(server)
                .post('/api/generes')
                .set({"x-Access-Token": token})
                .send({'name': "Genere1"});
            expect(res.status).toBe(403);
        });

        it('should return 400 if invalid genere name.', async () => {
            const token = new userModel({"isAdmin": true}).generateAuthToken();
            const res = await request(server)
                .post('/api/generes')
                .set({"x-Access-Token": token})
                .send({name: 123});
            expect(res.status).toBe(400);
        });

        it('should create the genere in the db', async () => {
            const token = new userModel({"isAdmin": true}).generateAuthToken();
            const res = await request(server)
                .post('/api/generes')
                .set({"x-Access-Token": token})
                .send({name: "Genere1"});
            expect(res.status).toBe(200);
            expect(res.body.name).toBe("Genere1");
        });
    });
});