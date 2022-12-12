import itemSchema from "../schema/item"
import validateObject from "./object"

const validateItem = (item: Object) => {
    return validateObject(itemSchema, item);
};

export default validateItem;