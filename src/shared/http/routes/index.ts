import { Router } from 'express';

import tenantsRouter from '@modules/tenants/routes/Tenant.Routes';
import usersRouter from '@modules/users/routes/User.Routes';

const routes = Router();

routes.get('/', (request, response) => {
  const date = new Date().toLocaleString();
  return response.json({ message: `server health in ${date}` });
});

/* tenants routes */
routes.use('/tenants/', tenantsRouter);

/* users routes */
routes.use('/users/', usersRouter);

export default routes;
