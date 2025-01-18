import { Router } from 'express';
import bodyParser from "body-parser";
import { Engagement } from '../common/types'
import game from './gameController';
import CommandController from '../commands/commandController';


const gameRouter = Router();
const controller = game();
const cmdController = CommandController();
gameRouter.use(bodyParser.json())

gameRouter.get('/', controller.list);
gameRouter.post('/new', controller.newGame);
gameRouter.get('/:id', controller.get);
gameRouter.get('/:id/countries', controller.getCountries);
gameRouter.get('/:id/players', controller.getPlayers);
gameRouter.get('/:id/commands', cmdController.get);
gameRouter.post('/:id/commands/attack' , cmdController.attack );
gameRouter.post('/:id/commands/deployTroops', cmdController.deployTroops);
gameRouter.post('/:id/commands/endTurn', cmdController.endTurn);


export default gameRouter
