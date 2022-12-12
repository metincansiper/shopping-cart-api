import searchByNameSchema from "../schema/searchByName";
import validateObject from "./object"

const validateSearchbyName = (body: Object) => {
    return validateObject(searchByNameSchema, body);
};

export default validateSearchbyName;