import getByIdSchema from "./schema/getById";
import Validator from "./Validator";

class GetByIdValidator extends Validator {
    constructor(obj: Object) {
        super(getByIdSchema, obj)
    }
}

export default GetByIdValidator;