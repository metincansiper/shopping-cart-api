import productSchema from "./schema/product";
import Validator from "./Validator";

class ProductValidator extends Validator {
    constructor(obj: Object) {
        super(productSchema, obj)
    }
}

export default ProductValidator;