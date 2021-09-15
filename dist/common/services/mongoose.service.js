"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default('app:mongoose-service');
class MongooseService {
    constructor() {
        this.count = 0;
        this.retrySeconds = 5;
        this.connectionString = "mongodb+srv://m001-student:jvDwUCTRF33CQ985@expressapp.r41mz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        this.mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            useFindAndModify: false,
        };
        this.connectWithRetry = () => {
            log('attempting MongoDb connection (will retry if needed)');
            mongoose_1.default
                .connect(this.connectionString, this.mongooseOptions)
                .then(() => {
                log('MongoDB is connected');
            })
                .catch((err) => {
                log(`MongoDB connection unsuccessful (will retry #${++this
                    .count} after ${this.retrySeconds} seconds):`, err);
                setTimeout(this.connectWithRetry, this.retrySeconds * 1000);
            });
        };
        this.connectWithRetry();
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tb25nb29zZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBQ2hDLGtEQUEwQjtBQUcxQixNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFM0QsTUFBTSxlQUFlO0lBV2pCO1FBVlEsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLHFCQUFnQixHQUFHLHNIQUFzSCxDQUFBO1FBQ3pJLG9CQUFlLEdBQUc7WUFDdEIsZUFBZSxFQUFFLElBQUk7WUFDckIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4Qix3QkFBd0IsRUFBRSxJQUFJO1lBQzlCLGdCQUFnQixFQUFFLEtBQUs7U0FDMUIsQ0FBQztRQVVGLHFCQUFnQixHQUFHLEdBQUcsRUFBRTtZQUNwQixHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUM1RCxrQkFBUTtpQkFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQ3BELElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1AsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7WUFDL0IsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNYLEdBQUcsQ0FDQyxnREFBZ0QsRUFBRSxJQUFJO3FCQUNqRCxLQUFLLFVBQVUsSUFBSSxDQUFDLFlBQVksWUFBWSxFQUNqRCxHQUFHLENBQ04sQ0FBQztnQkFDRixVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUE7WUFDL0QsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUE7UUF0QkcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLGtCQUFRLENBQUM7SUFDcEIsQ0FBQztDQWtCSjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==