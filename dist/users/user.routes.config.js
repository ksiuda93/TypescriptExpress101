"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
class UserRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {
        this.app
            .route('/users')
            .get(user_controller_1.default.listUsers)
            .post(users_middleware_1.default.validateRequiredUserBodyFields, users_middleware_1.default.checkIfEmailExistsInDatabase, user_controller_1.default.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route('/users/:userId')
            .all(users_middleware_1.default.checkIfUsersExistsInDatabase)
            .get(user_controller_1.default.getUserById)
            .delete(user_controller_1.default.removeUser);
        return this.app;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXNlcnMvdXNlci5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUFvRTtBQUVwRSxvRkFBMkQ7QUFDM0QscUZBQTREO0FBRTVELE1BQWEsVUFBVyxTQUFRLHlDQUFrQjtJQUU5QyxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsR0FBRzthQUNQLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixHQUFHLENBQUMseUJBQWMsQ0FBQyxTQUFTLENBQUM7YUFDN0IsSUFBSSxDQUNELDBCQUFlLENBQUMsOEJBQThCLEVBQzlDLDBCQUFlLENBQUMsNEJBQTRCLEVBQzVDLHlCQUFjLENBQUMsVUFBVSxDQUM1QixDQUFBO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLDBCQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLEdBQUc7YUFDUCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUFDLDBCQUFlLENBQUMsNEJBQTRCLENBQUM7YUFDakQsR0FBRyxDQUFDLHlCQUFjLENBQUMsV0FBVyxDQUFDO2FBQy9CLE1BQU0sQ0FBQyx5QkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRWxDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUExQkQsZ0NBMEJDIn0=