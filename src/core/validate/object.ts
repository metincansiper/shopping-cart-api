import Joi from 'joi';

const validateObject = (schema: Joi.ObjectSchema, obj: Object) => {
    return schema.validate(obj);
};

export default validateObject;