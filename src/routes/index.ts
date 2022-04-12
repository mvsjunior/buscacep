import {Router} from 'express';
import * as buscaCepController from '../controllers/buscaCepController';

const router = Router();

router.get('/', buscaCepController.homeCep);
router.get('/cep', buscaCepController.buscaCep);


export default router;