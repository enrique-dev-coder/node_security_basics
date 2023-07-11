import express from 'express';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import passport from './passportConfig.js'; // Importar el objeto passport configurado
import { createServer } from 'https';
import { readFileSync } from 'fs';
import { getDirnamePath } from './utils.js';
import { secretRouter } from './routes/secret.js';
import { authRouter } from './routes/auth.js';
import { PORT, AUTH_OPTIONS } from './const.js';

const app = express();
// revisar cookies en cada req, verificando si la key es unica
// te guarda un cookie en un header set cookie que se llama "sesion" cuando se hace el get a https://localhost:3000/auth/google/callbac
// en este caso ese cookie guarda informacion de la sesion del google profile
app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, // timepo de vida de la sesion
    // estas claves son para mantener a los usuarios logeados, se  supone deben ser muy seguros
    keys: [AUTH_OPTIONS.COOKIE_KEY_1, AUTH_OPTIONS.COOKIE_KEY_2],
  })
);

// iniciar sesion en passport
// passport toma datos del cookie de usuario y lo  pasa al req object para poder monitorear las reqs
// para esto requiere dos funciones la de serializar y la de deserializar usuarios
app.use(passport.initialize());
// passport entienda las sesiones que le encargamos arriba
app.use(passport.session());

// usar para seguridad extra SIEMPRE
app.use(helmet());

// routers
app.use(secretRouter);
app.use(authRouter);

app.get('/', (req, res) => {
  res.sendFile(getDirnamePath('public', 'index.html'));
});

createServer(
  {
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem'),
  },
  app
).listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
