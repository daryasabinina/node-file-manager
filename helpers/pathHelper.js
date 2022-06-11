import { fileURLToPath } from 'url';
import { dirname } from 'path';

const printCurrentPath = (path) => {
    console.log(`You are currently in ${path}`);
}

const handlePath = (path) => {
    const __filename = fileURLToPath(path);
    const __dirname = dirname(__filename);
    return { __filename,  __dirname };
}

export { printCurrentPath, handlePath };