import UserDao from '../dao/user.dao';
import { CRUD } from '../../common/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';


class UserService implements CRUD {
    async list (limit: number, page: number){
        return UserDao.getUsers(limit, page);
    }

    async getUserByEmail(email: string): Promise<any> {
        return UserDao.getUserByEmail(email);
    }

    async create(resource: CreateUserDto): Promise<any> {
        return UserDao.addUser(resource);
    }

    async putById(id: string, resource: PutUserDto): Promise<any> {
        return UserDao.updateUserById(id, resource);
    }

    async readById(id: string): Promise<any> {
        return UserDao.getUserById(id);
    }

    async deleteById(id: string): Promise<any> {
        return UserDao.removeUserById(id);
    }

    async patchById(id: string, resource: PatchUserDto): Promise<any> {
        return UserDao.updateUserById(id, resource);
    }

    async getUserByEmailWithPassword(email: string): Promise<any> {
        return UserDao.getUserByEmailWithPassword(email);
    }
    
}

export default new UserService();