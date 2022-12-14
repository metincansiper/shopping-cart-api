import userSchema from "./schema/user";
import Validator from "./Validator";

class UserValidator extends Validator {
    constructor(obj: Object) {
        super(userSchema, obj)
    }
}

export default UserValidator;