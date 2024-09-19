import { Router } from 'express';
import bodyParser from "body-parser";
import CommandController from './commandController'
import RiskLogger from '../common/util/riskLogger';
import { logger } from 'express-winston';


const router = Router();
const controller = CommandController();
router.use(bodyParser.json())

router.get('/', controller.get);
router.post('/attack', controller.attack);
router.post('/deployTroops', controller.deployTroops)
router.post('/endTurn', controller.endTurn);


export default router