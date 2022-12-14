import mongoose from "mongoose";
import User from "../../../core/entity/User";
import UserRepository from "../../../core/repository/UserRepository";
import MongoUserModel from "../model/user";
import { mongoEntityToJson } from "../util";

const mongoUserToUser = (mongoUser: mongoose.Document) => {
    const json: any = mongoEntityToJson(mongoUser);
    return User.fromJSON(json);
};

class MongoUserRepository implements UserRepository{
    async create(user: User): Promise<User> {
        const mongoUser = new MongoUserModel(user);
        await mongoUser.save();
        return mongoUserToUser(mongoUser);
    }
    async get(id: string): Promise<User | null> {
        const mongoUser = await MongoUserModel.findById(id);
        if (!mongoUser) {
            return null;
        }
        return mongoUserToUser(mongoUser);
    }
    async existsWithEmail(email: string): Promise<Boolean> {
        const doc = await MongoUserModel.exists({email});
        return !!doc;
    }
}

export default MongoUserRepository;