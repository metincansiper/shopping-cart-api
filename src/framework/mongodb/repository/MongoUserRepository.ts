import mongoose from "mongoose";
import User from "../../../core/entity/User";
import UserRepository from "../../../core/repository/UserRepository";
import MongoUserModel from "../model/user";
import { mongoEntityToJson } from "../util";

class MongoUserRepository implements UserRepository{
    async create(user: User): Promise<User> {
        const mongoUser = new MongoUserModel(user);
        await mongoUser.save();
        const json: any = mongoEntityToJson(mongoUser);
        return User.fromJSON(json);
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
        const json: any = mongoEntityToJson(mongoUser);
        return User.fromJSON(json);
    }
    getByEmail(email: string, opts?: Object | undefined): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async existsWithEmail(email: string): Promise<Boolean> {
        const doc = await MongoUserModel.exists({email});
        return !!doc;
    }
    getByName(name: string, opts?: Object | undefined): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}

export default MongoUserRepository;