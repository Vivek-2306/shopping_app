import mongoose from 'mongoose';

class MongoDB {
    connection: any;

    constructor() {
        this.connection = null;
    }

    async connect() {
        try {
            mongoose.Promise = global.Promise;
            await mongoose.connect(process.env.MONGODB_URL as string);
            this.connection = mongoose.connection;
            console.log('MongoDB connected');
        } catch (error) {
            console.log("MongoDB connection failed !: ", error);
            process.exit(1);
        }
    }

    async init() {
        try {
            if(!this.connection) await this.connect();
        } catch (error) {
            console.log("MongoDB connection failed !: ", error);
            process.exit(1);
        }
    }

    async getConnection() {
        try {
            await this.init();
            return this.connection as mongoose.Connection;
        } catch (error) {
            console.log("Error getting MongoDB connection !: ", error);
            process.exit(1);
        }
    }
}

const DBConfig = new MongoDB();
export default DBConfig;