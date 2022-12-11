import User from '../entity/User';

interface UserRepository {
    create(user: User): Promise<User>;
    // find(opts?: Object): Promise<User[]>;
    // findBy(props: Object): Promise<User[]>;
    get(id: string): Promise<User | null>;
    // getByEmail(email: string, opts?: Object): Promise<User>;
    // getByName(name: string, opts?: Object): Promise<User[]>;
    existsWithEmail(email: string): Promise<Boolean>;
}

export default UserRepository;