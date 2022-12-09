import User from "../../../core/entity/User";
import UserRepository from "../../../core/repository/UserRepository";

class MongoUserRepository implements UserRepository{
    constructor() {
        
    }
    async create(user: User): Promise<User> {
        return user;
    }
    find(opts?: Object | undefined): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    findBy(props: Object): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async get(id: string): Promise<User> {
        const user = new User('', '', '', '', 10);
        return user;
    }
    getByEmail(email: string, opts?: Object | undefined): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getByName(name: string, opts?: Object | undefined): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}

export default MongoUserRepository;