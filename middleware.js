// en este middleware se revisa si hay una sesion activa
// se puede usar tambine la fncion de req.isAuthenticated() de passport
export function checkLoggedIn(req, res, next) {
  // este user viene de la funcion de deserealize user
  // gracias a esto podemos ir guardando en cada req la info del usuario y podemos hacer un middleware que revise permisos de usuarios por ejemplo
  console.log('current user is', req.user);
  const isLoggedIn = req.user;
  if (!isLoggedIn) {
    return res.status(401).json({ error: 'You must log in!' });
  }
  next();
}
