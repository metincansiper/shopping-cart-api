import Joi from 'joi';

const searchByNameSchema = Joi.object().keys({
    name: Joi.string().min(1).required(),
    limit: Joi.number().min(0),
    skip: Joi.number().min(0)
});

export default searchByNameSchema;