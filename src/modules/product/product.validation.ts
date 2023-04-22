import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

const createProductBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  barcode: Joi.string().required(),
  price: Joi.number().required().positive(),
  active: Joi.boolean().required(),
  stock: Joi.number().required().integer().min(0),
  image: Joi.string().required(),
  background_color: Joi.string().required(),
  category_id: Joi.string().custom(objectId),
};

export const createProduct = {
  body: Joi.object().keys(createProductBody),
};

export const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    barcode: Joi.string(),
    price: Joi.number(),
    active: Joi.boolean(),
    stock: Joi.number(),
    image: Joi.string(),
    background_color: Joi.string(),
    category_id: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

export const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      barcode: Joi.string(),
      price: Joi.number(),
      active: Joi.boolean(),
      stock: Joi.number(),
      image: Joi.string(),
      background_color: Joi.string(),
      category_id: Joi.string(),
    })
    .min(1),
};

export const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};
