import express from 'express';
import { create, get, getAll, remove, update } from '../controller/category.js';
import { checkPermission } from '../middlewares/checkPermission.js';
const router = express.Router();

router.get('/', getAll);
router.get('/:id', get);
router.post('/', create);
router.delete('/:id', remove);
router.patch('/:id', update);

export default router;
