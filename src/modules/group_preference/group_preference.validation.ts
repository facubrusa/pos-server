import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

const createGroupPreferenceBody = {
  max_quantity: Joi.number().required(),
  obligatory: Joi.boolean().required(),
  group_id: Joi.string().custom(objectId),
};

export const createGroupPreference = {
  body: Joi.object().keys(createGroupPreferenceBody),
};

export const getGroupPreferences = {
  query: Joi.object().keys({
    max_quantity: Joi.number(),
    obligatory: Joi.boolean(),
    group_id: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getGroupPreference = {
  params: Joi.object().keys({
    groupPreferenceId: Joi.string().custom(objectId),
  }),
};

export const updateGroupPreference = {
  params: Joi.object().keys({
    groupPreferenceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      max_quantity: Joi.number(),
      obligatory: Joi.boolean(),
      group_id: Joi.string(),
    })
    .min(1),
};

export const deleteGroupPreference = {
  params: Joi.object().keys({
    groupPreferenceId: Joi.string().custom(objectId),
  }),
};
