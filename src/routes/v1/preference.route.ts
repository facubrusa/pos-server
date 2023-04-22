import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { preferenceController, preferenceValidation } from '../../modules/preference';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('managePreferences'), validate(preferenceValidation.createPreference), preferenceController.createPreference)
  .get(auth('getPreferences'), validate(preferenceValidation.getPreferences), preferenceController.getPreferences);

router
  .route('/:preferenceId')
  .get(auth('getPreferences'), validate(preferenceValidation.getPreference), preferenceController.getPreference)
  .patch(auth('managePreferences'), validate(preferenceValidation.updatePreference), preferenceController.updatePreference)
  .delete(auth('managePreferences'), validate(preferenceValidation.deletePreference), preferenceController.deletePreference);

export default router;
