import Joi from 'joi';

const itemSchema = Joi.object().keys({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required()
});

export default itemSchema;