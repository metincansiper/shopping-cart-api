import User from '../core/entity/User';
import UserRepository from '../core/repository/UserRepository';
import CreateUser from '../core/usecase/CreateUser';
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
        const { queryParams } = req.toJson();
        const { id } = queryParams as { id: string };
        const getUser = new GetUser(this.userRepository);
        const user = await getUser.execute(id);
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;
        if (user) {
            res = new HttpResponseParams();
            res.setStatusCode(200);
            res.setData(user);
        }
        else {
            const message: string = 'User not found';
            err = new HttpErrorParams({ message });
        }

        return [res, err];
    }

    async createUser(req: HttpRequestParams): Promise<[HttpResponseParams | undefined, HttpErrorParams | undefined]> {
        const { body } = req.toJson();
        const user: User = body as User;
        let res: HttpResponseParams | undefined, err: HttpErrorParams | undefined;

        const createUser = new CreateUser(this.userRepository);
        const createdUser = await createUser.execute(user);
        
        if (createdUser) {
            res = new HttpResponseParams();
            res.setStatusCode(200);
            res.setData(createdUser);
        }
        else {
            const message: string = 'User creation has failed';
            err = new HttpErrorParams({ message }); 
        }

        return [res, err];
    }
}

export default UserController;