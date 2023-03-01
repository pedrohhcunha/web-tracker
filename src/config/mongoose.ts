import { connect } from 'mongoose';

export async function connectMongoose() {
    try {
        const MONGO_URI = process.env.MONGO_URI || '';
        await connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}

