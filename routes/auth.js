import { Router } from 'express';
import passport from '../passportConfig.js';

export const authRouter = Router();

authRouter.get(
  '/auth/google',
  // nomas con esta linea ya tenemos para que te mande a la pagina de login con google
  passport.authenticate('google', { scope: ['email'] })
);

// redireccion necesaria para que google auth sepa a donde mandar la data
authRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,
  }),
  (req, res) => {
    console.log('Google called us back!');
  }
);

authRouter.get('/auth/logout', (req, res) => {
  req.logout(); // Removes Req.user and clears any logged in session
  // redireccionar a la home
  return res.redirect('/');
});

authRouter.get('/failure', (req, res) => {
  return res.send('Failed login :C');
});
