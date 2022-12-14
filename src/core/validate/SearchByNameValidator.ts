import searchByNameSchema from "./schema/searchByName";
import Validator from "./Validator";

class SearchByNameValidator extends Validator {
    constructor(obj: Object) {
        super(searchByNameSchema, obj)
    }
}

export default SearchByNameValidator;