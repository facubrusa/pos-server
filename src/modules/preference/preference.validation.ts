import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

const createPreferenceBody = {
  name: Joi.string().required(),
  surcharge: Joi.number().required().min(0),
  active: Joi.boolean().required(),
  stock: Joi.number().required().integer().min(0),
};

export const createPreference = {
  body: Joi.object().keys(createPreferenceBody),
};

export const getPreferences = {
  query: Joi.object().keys({
    name: Joi.string(),
    surcharge: Joi.number(),
    active: Joi.boolean(),
    stock: Joi.number(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getPreference = {
  params: Joi.object().keys({
    preferenceId: Joi.string().custom(objectId),
  }),
};

export const updatePreference = {
  params: Joi.object().keys({
    preferenceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      surcharge: Joi.number(),
      active: Joi.boolean(),
      stock: Joi.number(),
    })
    .min(1),
};

export const deletePreference = {
  params: Joi.object().keys({
    preferenceId: Joi.string().custom(objectId),
  }),
};
