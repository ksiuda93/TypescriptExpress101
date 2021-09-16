import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
import userController from "./controllers/user.controller";
import usersMiddleware from "./middleware/users.middleware";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from 'express-validator';

export class UserRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route('/users')
            .get(userController.listUsers)
            .post(
                body('email').isEmail(),
                body('password')
                    .isLength({min: 5})
                    .withMessage(`Must include password (5+ characters)`),
                bodyValidationMiddleware.verifyBodyFieldsErrors,
                usersMiddleware.checkIfEmailExistsInDatabase,
                userController.createUser
            )

        this.app.param(`userId`, usersMiddleware.extractUserId);

        this.app
            .route('/users/:userId')
            .all(usersMiddleware.checkIfUsersExistsInDatabase)
            .get(userController.getUserById)
            .delete(userController.removeUser)

        return this.app;
    }
}