import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/config.js';

if (!DB_URI) {
    throw new Error("DB_URI is not define in .env");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`${DB_URI}/instaneeds`);
        const db = mongoose.connection.name;
        console.log(`Connected to database in ${NODE_ENV} mode with name ${db}`);
    } catch (error) {
        console.error('Error connecting to database', error);
        process.exit(1);
    }
}

export default connectToDatabase;