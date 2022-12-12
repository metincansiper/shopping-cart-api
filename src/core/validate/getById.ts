import getByIdSchema from "../schema/getById";
import validateObject from "./object"

const validateGetById = (body: Object) => {
    return validateObject(getByIdSchema, body);
};

export default validateGetById;