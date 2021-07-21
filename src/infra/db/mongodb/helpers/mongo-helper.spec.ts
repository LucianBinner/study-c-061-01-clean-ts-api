import { MongoHelper as sut } from "./mongo-helper";

describe('Mongo Helper', () => {
    beforeAll(async () => {
        await sut.connect(process.env.MONGO_URL as string)
    })

    afterAll(async () => {
        await sut.disconect()
    })

    test('Should reconnect if mongodb is down', async () => {
        let accountCollection = await sut.getCollection('accounts')
        expect(accountCollection).toBeTruthy()
        await sut.disconect()
        accountCollection = await sut.getCollection('accounts')
        expect(accountCollection).toBeTruthy()
    });
});