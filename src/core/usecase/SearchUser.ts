import User from '../entity/User';
import UserRepository from '../repository/UserRepository';

class SearchUser {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    // async execute(opts?: Object): Promise<User[]> {
    //     const users: User[] = await this.userRepository.find();
    //     return users;
    // }

    // async executeByEmail(email: string): Promise<User> {
    //     const user: User = await this.userRepository.getByEmail(email);
    //     return user;
    // }

    // async executeByName(name: string): Promise<User[]> {
    //     const users: User[] = await this.userRepository.getByName(name);
    //     return users;
    // }
}

export default SearchUser;