import { config } from 'dotenv';

// read enviromental variables, it is just needed to ve called on the top of the file
config();

export const googleAuthConfig = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  SECRET: process.env.GOOGLE_CLIENT_SECRET,
};

export const PORT = process.env.PORT;

export const AUTH_OPTIONS = {
  // google debe saber a cual endpoint regresarle la info
  callbackURL: '/auth/google/callback',
  clientID: googleAuthConfig.CLIENT_ID,
  clientSecret: googleAuthConfig.SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};
