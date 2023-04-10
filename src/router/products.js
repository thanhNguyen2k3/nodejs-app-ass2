import express from 'express';
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../controller/products.js';
import { checkPermission } from '../middlewares/checkPermission.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
