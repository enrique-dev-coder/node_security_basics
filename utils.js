import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ECMAScript module
const __filename = fileURLToPath(import.meta.url);
// sacar todo el path del archivo desde el servidor
const __dirname = dirname(__filename);

export const getDirnamePath = (folderName, fileNameWithExtension) => {
  // hacer el join
  return join(__dirname, folderName, fileNameWithExtension);
};
