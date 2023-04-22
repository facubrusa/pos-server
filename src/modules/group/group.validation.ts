import Joi from 'joi';
import { objectId } from '../validate/custom.validation';

const createGroupBody = {
  name: Joi.string().required(),
  active: Joi.boolean().required(),
};

export const createGroup = {
  body: Joi.object().keys(createGroupBody),
};

export const getGroups = {
  query: Joi.object().keys({
    name: Joi.string(),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getGroup = {
  params: Joi.object().keys({
    groupId: Joi.string().custom(objectId),
  }),
};

export const updateGroup = {
  params: Joi.object().keys({
    groupId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      active: Joi.boolean(),
    })
    .min(1),
};

export const deleteGroup = {
  params: Joi.object().keys({
    groupId: Joi.string().custom(objectId),
  }),
};
