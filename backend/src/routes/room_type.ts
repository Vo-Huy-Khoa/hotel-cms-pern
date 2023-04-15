import { Router } from 'express';
import roomTypeController from '../controllers/roomTypeController';

const router = Router();

router.post('/create', roomTypeController.create);
router.get('/edit/:id', roomTypeController.find);
router.put('/update', roomTypeController.update);
router.post('/search', roomTypeController.search);
router.post('/find', roomTypeController.update);
router.delete('/delete/:id', roomTypeController.delete);
router.get('/count', roomTypeController.count);
router.get('/', roomTypeController.getAll);

export default router;
