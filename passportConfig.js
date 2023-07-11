// passportConfig.js
// recordemos usar la version 5 de passport npm install passport@0.5
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { AUTH_OPTIONS } from './const.js';

//  function used in googleAuth and passport
const verifyAuthCallback = (accessToken, refreshToken, profile, done) => {
  // console.log('Google profile', profile);
  // passport provided fucntion
  done(null, profile);
};

// Configurar la estrategia de autenticación de Google
passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyAuthCallback));

// Guardar la sesión en la cookie del usuario
passport.serializeUser((user, done) => {
  done(null, { id: user.id, email: user.emails[0].value });
});

// Leer la sesión de la cookie
// esto se puede usar para por ejemplo leer privilegios de usuarios
// o por ejemplo buscar por id a una base de datos los privilegios
passport.deserializeUser((obj, done) => {
  console.log('obj', obj);
  done(null, obj);
});

export default passport;
