import Joi from 'joi';

const userSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).lowercase().required(),
    surname: Joi.string().alphanum().min(3).max(30).lowercase().required(),
    address: Joi.string().alphanum().min(5).max(30).required(),
    email: Joi.string().email().lowercase().required()
});

export default userSchema;