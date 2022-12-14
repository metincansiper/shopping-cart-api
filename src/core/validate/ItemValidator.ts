import itemSchema from "./schema/item";
import Validator from "./Validator";

class ItemValidator extends Validator {
    constructor(obj: Object) {
        super(itemSchema, obj)
    }
}

export default ItemValidator;