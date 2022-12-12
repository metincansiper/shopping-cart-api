import productSchema from "../schema/product";
import validateObject from "./object"

const validateProduct = (product: Object) => {
    return validateObject(productSchema, product);
};

export default validateProduct;