import mongoose from 'mongoose';
import ENV from './env.js';

if (!ENV.DB_URI) {
    throw new Error("DB_URI is not define in .env");
}

const connectDB = async () => {
    try {
        await mongoose.connect(`${ENV.DB_URI}/${ENV.DB_NAME}`);
        console.log(`Connected to database in ${ENV.NODE_ENV} mode with name ${mongoose.connection.name}`);
    } catch (error) {
        console.error('Error connectingg to database', error);
        throw error;
    }
}

export default connectDB;