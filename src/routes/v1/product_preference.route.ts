import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { productPreferenceController, productPreferenceValidation } from '../../modules/product_preference';

const router: Router = express.Router();

router
  .route('/')
  .post(
    auth('manageProductPreferences'),
    validate(productPreferenceValidation.createProductPreference),
    productPreferenceController.createProductPreference
  )
  .get(
    auth('getProductPreferences'),
    validate(productPreferenceValidation.getProductPreferences),
    productPreferenceController.getProductPreferences
  );

router
  .route('/:productPreferenceId')
  .get(
    auth('getProductPreferences'),
    validate(productPreferenceValidation.getProductPreference),
    productPreferenceController.getProductPreference
  )
  .patch(
    auth('manageProductPreferences'),
    validate(productPreferenceValidation.updateProductPreference),
    productPreferenceController.updateProductPreference
  )
  .delete(
    auth('manageProductPreferences'),
    validate(productPreferenceValidation.deleteProductPreference),
    productPreferenceController.deleteProductPreference
  );

export default router;
