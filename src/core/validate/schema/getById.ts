import Joi from 'joi';

const getByIdSchema = Joi.object().keys({
    id: Joi.string().required()
});

export default getByIdSchema;