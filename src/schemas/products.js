import Joi from 'joi';

const productSchema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
});

export default productSchema;
