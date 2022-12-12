import User from "../../../core/entity/User";
import UserRepository from "../../../core/repository/UserRepository";
import InmemoryRepository from "./InmemoryRepository";

class InmemoryUserRepository extends InmemoryRepository implements UserRepository {
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