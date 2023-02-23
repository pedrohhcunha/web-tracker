import { connect } from 'mongoose';

export async function connectMongoose() {
    try {
        const MONGO_URI = process.env.MONGO_URI || '';
        await connect(MONGO_URI);
    } catch (err) {
        console.error(err);
    }
}

