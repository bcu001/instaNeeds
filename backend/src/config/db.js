import mongoose from 'mongoose';
import ENV from './env.js';
import dns from 'dns';

dns.setServers([
    "0.0.0.0",
    "8.8.8.8"
])

if (!ENV.DB_URI) {
    throw new Error("DB_URI is not define in .env");
}

const connectDB = async () => {
    try {
        await mongoose.connect(`${ENV.DB_URI}/${ENV.DB_NAME}`);
        console.log(`Connected to database in ${ENV.NODE_ENV} mode with name ${mongoose.connection.name}`);
    } catch (error) {
        console.error('Error connectingg to database', error);
        process.exit(1);
    }
}

export default connectDB;