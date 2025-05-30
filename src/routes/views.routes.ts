import { Router }  from 'express';
import viewsController from '../controllers/views.controller';

const viewsRouter = Router();

viewsRouter.get('/', viewsController.MAIN);
viewsRouter.get('/register', viewsController.REGISTER_PAGE);
viewsRouter.get('/login', viewsController.LOGIN_PAGE);

export default viewsRouter;