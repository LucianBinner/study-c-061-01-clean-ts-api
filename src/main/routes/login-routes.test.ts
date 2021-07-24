import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Login Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string)
    })

    afterAll(async () => {
        await MongoHelper.disconect()
    })

    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    describe('POST /signup', () => { 
        test('Should return 200 on signup', async () => {
            await request(app)
                .post('/api/signup')
                .send({
                    name: 'Binner',
                    email: 'binner@email.com',
                    password: '123',
                    passwordConfirmation: '123'
                })
                .expect(200)
        })
    })
})