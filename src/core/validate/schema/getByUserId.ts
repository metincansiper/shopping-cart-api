import Joi from 'joi';

const getByUserIdSchema = Joi.object().keys({
    userId: Joi.string().required()
});

export default getByUserIdSchema;