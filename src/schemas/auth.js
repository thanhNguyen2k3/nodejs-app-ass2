import Joi from 'joi';

export const signupSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required().messages({
        'string.email': 'Email invalid',
        'string.empty': 'Email is not empty',
        'string.required': 'Email is required',
    }),
    password: Joi.string().required().min(6).messages({
        'string.empty': 'Password is not empty',
        'any.required': 'Password is required',
        'string.min': 'Password must have at least {#limit} characters',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Password is not match',
        'string.empty': 'Confirm password is not empty',
        'string.required': 'Confirm password is required',
    }),
});

export const signinSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'Trường "email" không được để trống',
        'string.email': 'Trường "email" không đúng định dạng',
        'any.required': 'Trường "email" là bắt buộc',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Trường "mật khẩu" không được để trống',
        'string.min': 'Trường "mật khẩu" phải có ít nhất 6 ký tự',
        'any.required': 'Trường mật khẩu là bắt buộc',
    }),
});
