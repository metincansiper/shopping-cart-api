import updateQuantitySchema from "../schema/updateQuantity";
import validateObject from "./object"

const validateUpdateQuantity = (body: Object) => {
    return validateObject(updateQuantitySchema, body);
};

export default validateUpdateQuantity;