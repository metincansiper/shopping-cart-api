import User from '../entity/User';
import UserRepository from '../repository/UserRepository';

class CreateUser {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(user: User): Promise<User|null> {
        const existingUser = await this.userRepository.existsWithEmail(user.email);
        if (existingUser) {
            return null;
        }

        const persistedUser: User = await this.userRepository.create(user);
        return persistedUser;
    }
}

export default CreateUser;