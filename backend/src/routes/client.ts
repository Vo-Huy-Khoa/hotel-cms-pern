import { Router } from 'express';
import clientController from '../controllers/clientController';

const router = Router();

router.post('/create', clientController.create);
router.get('/edit/:id', clientController.find);
router.put('/update', clientController.update);
router.delete('/delete/:id', clientController.delete);
router.get('/count', clientController.count);
router.get('/', clientController.getAll);

export default router;
