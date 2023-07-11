import { Router } from 'express';
import { checkLoggedIn } from '../middleware.js';

export const secretRouter = Router();
// puedes pasar un middleware o varios  a un solo endpoint pasando la funcion como parametro a una ruta

secretRouter.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your personal secret value is 42');
});
