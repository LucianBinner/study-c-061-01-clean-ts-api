import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient | null,
    async connect(uri: string): Promise<void> {
        this.client = await MongoClient.connect(process.env.MONGO_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); 
    },
    async disconect (): Promise<void> {
        await this.client.close()
    },
    getCollection(name: string): Collection {
        return this.client.db().collection(name)
    }
}