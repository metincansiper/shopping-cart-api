import Joi from "joi";

class Validator {
    private schema: Joi.ObjectSchema;
    private obj: Object;
    private validationResult: Joi.ValidationResult | null;

    constructor(schema: Joi.ObjectSchema, obj: Object) {
        this.schema = schema;
        this.obj = obj;
        this.validationResult = null;
    }

    private getValidationResult() {
        this.validate();
        return this.validationResult as Joi.ValidationResult;
    }

    validate() {
        if (!this.validationResult) {
            this.validationResult = this.schema.validate(this.obj);
        }
    }

    getValue() {
        const validationResult = this.getValidationResult();
        return validationResult.value;
    }

    getError() {
        const validationResult = this.getValidationResult();
        return validationResult.error;
    }

    getErrorMessage() {
        const validationError = this.getError();
        if (!validationError) {
            return null;
        }

        return validationError.message;
    }
}

export default Validator;