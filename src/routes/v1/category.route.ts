import express, { Router } from 'express';
import { categoryController } from '../../modules/category';

const router: Router = express.Router();

router.route('/').post(categoryController.createCategory).get(categoryController.getCategories);

router.route('/:categoryId').get(categoryController.getCategory);

export default router;
