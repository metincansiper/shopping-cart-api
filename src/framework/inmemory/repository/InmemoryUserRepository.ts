import User from "../../../core/entity/User";
import UserRepository from "../../../core/repository/UserRepository";
import InmemoryRepository from "./InmemoryRepository";

class InmemoryUserRepository extends InmemoryRepository implements UserRepository {
    async create(user: User): Promise<User> {
        return await super.create(user) as User;
    }
    async get(id: string): Promise<User | null> {
        return await super.get(id) as User | null;
    }
    async existsWithEmail(email: string): Promise<Boolean> {
        for (const json of this.jsons.values()){
            if (json.email == email) {
                return true;
            }
        }
        return false;
    }
    fromJson(json: any): User {
        return User.fromJSON(json);
    }
}

export default InmemoryUserRepository;