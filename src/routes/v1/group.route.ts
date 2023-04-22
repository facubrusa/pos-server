import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { groupController, groupValidation } from '../../modules/group';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageGroups'), validate(groupValidation.createGroup), groupController.createGroup)
  .get(auth('getGroups'), validate(groupValidation.getGroups), groupController.getGroups);

router
  .route('/:groupId')
  .get(auth('getGroups'), validate(groupValidation.getGroup), groupController.getGroup)
  .patch(auth('manageGroups'), validate(groupValidation.updateGroup), groupController.updateGroup)
  .delete(auth('manageGroups'), validate(groupValidation.deleteGroup), groupController.deleteGroup);

export default router;
