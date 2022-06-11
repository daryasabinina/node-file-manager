import path from 'path';
import os from 'os';

const printCurrentPath = (path) => {
    console.log(`You are currently in ${path}`);
}

const getNormalizedPath = (newPath, currentPath) => {
    return path.isAbsolute(newPath) ? newPath : path.normalize(currentPath + '/' + newPath);
}

const isAccessToPath = (p) => {
    const initDir = os.homedir();
    const normalizedDir = getNormalizedPath(p)

    return normalizedDir.indexOf(initDir) === 0;
}

export { printCurrentPath, isAccessToPath, getNormalizedPath };