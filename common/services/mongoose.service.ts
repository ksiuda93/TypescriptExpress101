import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private count = 0;
    private retrySeconds = 5;
    private connectionString = "mongodb+srv://m001-student:k3Y7DmitxmTLe4nW@expressapp.r41mz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    };

    constructor() {
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        log('attempting MongoDb connection (will retry if needed)');
        mongoose
            .connect(this.connectionString, this.mongooseOptions)
            .then(() => {
                log('MongoDB is connected')
            })
            .catch((err) => {
                log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${this.retrySeconds} seconds):`,
                    err
                );
                setTimeout(this.connectWithRetry, this.retrySeconds * 1000)
            })
    }
}

export default new MongooseService();