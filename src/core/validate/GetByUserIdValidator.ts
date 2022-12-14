import getByUserIdSchema from "./schema/getByUserId";
import Validator from "./Validator";

class GetByUserIdValidator extends Validator {
    constructor(obj: Object) {
        super(getByUserIdSchema, obj)
    }
}

export default GetByUserIdValidator;