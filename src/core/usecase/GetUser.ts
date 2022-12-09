import User from '../entity/User';
import UserRepository from '../repository/UserRepository';

class GetUser {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string): Promise<User> {
        const user: User = await this.userRepository.get(userId);
        return user;
    }
}

export default GetUser;