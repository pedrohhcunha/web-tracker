import { connect, set } from 'mongoose';

export async function connectMongoose() {
    try {
        const MONGO_URI = process.env.MONGO_URI || '';
        set("strictQuery", true);
        await connect(MONGO_URI);
    } catch (err) {
        console.error(err);
    }
}

