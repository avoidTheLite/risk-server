import { Router } from 'express';
import bodyParser from "body-parser";
import CommandController from './commandController'
import { Engagement } from '../controllers/lib/types'


const router = Router();
const controller = CommandController();
router.use(bodyParser.json())

router.get('/commands', controller.get);
router.post('/attack', controller.attack);
router.post('/deployTroops', controller.deployTroops);


export default router
