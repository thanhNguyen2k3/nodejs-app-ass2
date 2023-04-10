import express from 'express';
import routerProducts from './products.js';
import routerAuth from './auth.js';
import routerCategory from './category.js';

const router = express.Router();

router.use('/products', routerProducts);
router.use('/auth', routerAuth);
router.use('/categories', routerCategory);

export default router;
