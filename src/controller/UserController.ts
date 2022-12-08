import UserRepository from '../core/repository/UserRepository';
import GetUser from '../core/usecase/GetUser';
class UserController {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUser(req: HttpRequestParams) {
        const { body } = req.toJson();
        const { userId } = body as { userId: String };
        const getUser = new GetUser(this.userRepository);
        const user = await getUser.execute(userId);
        const res = new HttpResponseParams();
        if (user) {
            res.setStatusCode(200);
            res.setData(user);
        }
        else {
            res.setIsError(true);
        }

        return res;
    }
}