import Joi, { ObjectSchema } from "joi";

const createUserSchema: ObjectSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema: ObjectSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

export default { createUserSchema, updateUserSchema };
