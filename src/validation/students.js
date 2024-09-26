import Joi from 'joi';

// Оголошення схеми з кастомізованими повідомленнями
export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  age: Joi.number().integer().min(6).max(100).required().messages({
    'number.base': 'Age should be a number',
    'number.integer': 'Age should be an integer',
    'number.min': 'Age must be at least {#limit}',
    'number.max': 'Age must be at most {#limit}',
    'any.required': 'Age is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender should be a string',
    'any.only': 'Gender must be one of: {#valids}',
    'any.required': 'Gender is required',
  }),
  avgMark: Joi.number().min(2).max(12).required().messages({
    'number.base': 'Average mark should be a number',
    'number.min': 'Average mark must be at least {#limit}',
    'number.max': 'Average mark must be at most {#limit}',
    'any.required': 'Average mark is required',
  }),
  onDuty: Joi.boolean(),
  parentId: Joi.string().required().messages({
    'string.base': 'Parent ID should be a string',
    'any.required': 'Parent ID is required',
  }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email',
  }),
  age: Joi.number().integer().min(6).max(16).messages({
    'number.base': 'Age should be a number',
    'number.integer': 'Age should be an integer',
    'number.min': 'Age must be at least {#limit}',
    'number.max': 'Age must be at most {#limit}',
  }),
  gender: Joi.string().valid('male', 'female', 'other').messages({
    'string.base': 'Gender should be a string',
    'any.only': 'Gender must be one of: {#valids}',
  }),
  avgMark: Joi.number().min(2).max(12).messages({
    'number.base': 'Average mark should be a number',
    'number.min': 'Average mark must be at least {#limit}',
    'number.max': 'Average mark must be at most {#limit}',
  }),
  onDuty: Joi.boolean(),
  parentId: Joi.string().messages({
    'string.base': 'Parent ID should be a string',
  }),
});
