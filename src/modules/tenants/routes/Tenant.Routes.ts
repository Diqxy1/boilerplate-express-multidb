import { Router } from 'express';

import TenantsController from '../controller/TenantsController';

const tenantsRouter = Router();

const tenantsController = new TenantsController();

tenantsRouter.post('/create', tenantsController.create);

export default tenantsRouter;
