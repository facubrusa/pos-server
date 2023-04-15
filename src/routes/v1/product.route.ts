import express, { Router } from 'express';
import { productController } from '../../modules/product';

const router: Router = express.Router();

router.route('/').get(productController.getProducts);
router.route('/:productId').get(productController.getProduct);

export default router;
