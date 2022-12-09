import User from "../../../core/entity/User";
import UserRepository from "../../../core/repository/UserRepository";
import MongoUserModel from "../model/user";

class MongoUserRepository implements UserRepository{
    async create(user: User): Promise<User> {
        const mongoUser = new MongoUserModel(user);
        await mongoUser.save();
        return User.fromJSON(mongoUser.toJSON());
    }

    find(opts?: Object | undefined): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    findBy(props: Object): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async get(id: string): Promise<User | null> {
        const mongoUser = await MongoUserModel.findById(id);
        if (!mongoUser) {
            return null;
        }
        return User.fromJSON(mongoUser.toJSON());
    }
    getByEmail(email: string, opts?: Object | undefined): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getByName(name: string, opts?: Object | undefined): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}

export default MongoUserRepository;