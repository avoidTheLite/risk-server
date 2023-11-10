import { Router } from 'express';
import bodyParser from "body-parser";
import { Engagement } from '../controllers/lib/types'
import game from './gameController';


const router = Router();
const controller = game();
router.use(bodyParser.json())

router.get('/game', controller.get);
router.post('/game/new', controller.newGame);
router.post('game/end', controller.end);


export default router
