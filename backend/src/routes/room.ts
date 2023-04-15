import { Router } from 'express';
import roomController from '../controllers/roomController';

const router = Router();

router.post('/create', roomController.create);
router.get('/edit/:id', roomController.find);
router.post('/search', roomController.search);
router.put('/update', roomController.update);
router.delete('/delete/:id', roomController.delete);
router.get('/count', roomController.count);
router.get('/', roomController.getAll);

export default router;
