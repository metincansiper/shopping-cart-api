import User from '../entity/User';

interface UserRepository {
    create(user: User): Promise<User>;
    find(opts?: Object): Promise<User[]>;
    findBy(props: Object): Promise<User[]>;
    get(id: String): Promise<User>;
    getByEmail(email: String, opts?: Object): Promise<User>;
    getByName(name: String, opts?: Object): Promise<User[]>;
}

export default UserRepository;