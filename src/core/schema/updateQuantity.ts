import Joi from 'joi';

const updateQuantitySchema = Joi.object().keys({
    id: Joi.string().required(),
    quantityChange: Joi.number()
});

export default updateQuantitySchema;