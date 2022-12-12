import userSchema from "../schema/user";
import validateObject from "./object";

const validateUser = (user: Object) => {
    return validateObject(userSchema, user);
};

export default validateUser;