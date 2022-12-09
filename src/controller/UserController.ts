import User from '../core/entity/User';
import UserRepository from '../core/repository/UserRepository';
import GetUser from '../core/usecase/GetUser';
import HttpErrorParams from '../param/HttpErrorParams';
import HttpRequestParams from '../param/HttpRequestParams';
import HttpResponseParams from '../param/HttpResponseParams';

class UserController {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUser(req: HttpRequestParams): Promise<[HttpResponseParams | undefined, HttpErrorParams | undefined]> {
        const { body } = req.toJson();
        const { userId } = body as { userId: string };
        const getUser = new GetUser(this.userRepository);
        const user = await getUser.execute(userId);
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;
        if (user) {
            res = new HttpResponseParams();
            res.setStatusCode(200);
            res.setData(user);
        }
        else {
            err = new HttpErrorParams();
        }

        return [res, err];
    }
}

export default UserController;