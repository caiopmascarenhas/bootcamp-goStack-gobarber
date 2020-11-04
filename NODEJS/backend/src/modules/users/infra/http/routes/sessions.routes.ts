import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new UsersController();

sessionsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }), sessionsController.create);

export default sessionsRouter;