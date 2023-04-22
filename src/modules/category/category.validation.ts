import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

const createCategoryBody = {
  name: Joi.string().required(),
  active: Joi.boolean().required(),
  image: Joi.string().required(),
  background_color: Joi.string().required(),
};

export const createCategory = {
  body: Joi.object().keys(createCategoryBody),
};

export const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    active: Joi.boolean(),
    image: Joi.string(),
    background_color: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

export const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      active: Joi.boolean(),
      image: Joi.string(),
      background_color: Joi.string(),
    })
    .min(1),
};

export const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};
