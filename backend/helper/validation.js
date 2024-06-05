//required packages
const Joi = require('joi'); //for validation 

const signUpSchema = Joi.object().keys({ 
    name: Joi.string()
        .min(3)
        .max(40)
        .required(),
    email: Joi.string()
        .min(3)
        .max(50)
        .required(),
    pass: Joi.string()
        .min(3)
        .max(12)
        .required()
})


const loginSchema = Joi.object().keys({
    email: Joi.string()
        .min(3)
        .max(50)
        .required(),
    pass: Joi.string()
        .min(3)
        .max(12)
        .required()
})


const createCategorySchema = Joi.object().keys({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
})

const createProductSchema = Joi.object().keys({ 
    name: Joi.string()
        .min(3)
        .max(40)
        .required(),
    description: Joi.string()
        .min(3)
        .max(1000)
        .required(),
    category: Joi.string()
        .required(),
    quantity: Joi.number()
        .min(1)
        .required(),
    pricePerQuantity: Joi.number()
        .min(3)
        .max(111111)
        .required()
})

const initiateCheckoutSchema = Joi.object({ 
    paymentType: Joi.string()
        .min(3)
        .max(40)
        .required(),
    firstname: Joi.string()
        .min(3)
        .max(50)
        .required(),
    secondname: Joi.string()
        .min(3)
        .max(50)
        .required(),
    address: Joi.string()
        .required(),
    address2: Joi.string()
        .optional(),
    city: Joi.string()
        .min(1)
        .required(),
    state: Joi.string()
        .min(1)
        .required(),
    zip: Joi.string()
        .min(1)
        .required()
})

const updateOrderstatusSchema = Joi.object().keys({
    status: Joi.string()
        .min(3)
        .max(50)
        .required()
})
module.exports = {
    signUpSchema,
    loginSchema,
    createCategorySchema,
    createProductSchema,
    initiateCheckoutSchema,
    updateOrderstatusSchema
}