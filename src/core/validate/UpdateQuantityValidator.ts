import updateQuantitySchema from "./schema/updateQuantity";
import Validator from "./Validator";

class UpdateQuantityValidator extends Validator {
    constructor(obj: Object) {
        super(updateQuantitySchema, obj)
    }
}

export default UpdateQuantityValidator;