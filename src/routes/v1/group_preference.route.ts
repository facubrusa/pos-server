import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { groupPreferenceController, groupPreferenceValidation } from '../../modules/group_preference';

const router: Router = express.Router();

router
  .route('/')
  .post(
    auth('manageGroupPreference'),
    validate(groupPreferenceValidation.createGroupPreference),
    groupPreferenceController.createGroupPreference
  )
  .get(
    auth('getGroupPreference'),
    validate(groupPreferenceValidation.getGroupPreferences),
    groupPreferenceController.getGroupPreferences
  );

router
  .route('/:groupPreferenceId')
  .get(
    auth('getGroupPreference'),
    validate(groupPreferenceValidation.getGroupPreference),
    groupPreferenceController.getGroupPreference
  )
  .patch(
    auth('manageGroupPreference'),
    validate(groupPreferenceValidation.updateGroupPreference),
    groupPreferenceController.updateGroupPreference
  )
  .delete(
    auth('manageGroupPreference'),
    validate(groupPreferenceValidation.deleteGroupPreference),
    groupPreferenceController.deleteGroupPreference
  );

export default router;
