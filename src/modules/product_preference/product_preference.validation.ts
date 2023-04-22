import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

const createProductPreferenceBody = {
  preference_id: Joi.string().custom(objectId),
  product_id: Joi.string().custom(objectId),
  group_preference_id: Joi.string().custom(objectId),
};

export const createProductPreference = {
  body: Joi.object().keys(createProductPreferenceBody),
};

export const getProductPreferences = {
  query: Joi.object().keys({
    preference_id: Joi.string().custom(objectId),
    product_id: Joi.string().custom(objectId),
    group_preference_id: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getProductPreference = {
  params: Joi.object().keys({
    productPreferenceId: Joi.string().custom(objectId),
  }),
};

export const updateProductPreference = {
  params: Joi.object().keys({
    productPreferenceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      preference_id: Joi.string().custom(objectId),
      product_id: Joi.string().custom(objectId),
      group_preference_id: Joi.string().custom(objectId),
    })
    .min(1),
};

export const deleteProductPreference = {
  params: Joi.object().keys({
    productPreferenceId: Joi.string().custom(objectId),
  }),
};
