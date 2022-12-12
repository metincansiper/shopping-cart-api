import getByUserIdSchema from "../schema/getByUserId";
import validateObject from "./object"

const validateGetByUserId = (body: Object) => {
    return validateObject(getByUserIdSchema, body);
};

export default validateGetByUserId;