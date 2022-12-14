import Joi from 'joi';

const productSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).lowercase().required(),
    price: Joi.number().min(1).required()
});

export default productSchema;