import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  const date = new Date().toLocaleString();
  return response.json({ message: `server health in ${date}` });
});

export default routes;
