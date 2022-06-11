import fs from 'fs/promises';
import path from 'path';

import { printError } from '../helpers/handleError.js';

const up = (currentPath, initPath) => {
    if (currentPath === initPath) {
        return currentPath;
    } else {
        return path.normalize(currentPath + '/..');
    }
}

const cd = async (currentPath, newPath, initPath) => {
    try {
        let newDir = '';
        if (path.isAbsolute(newPath) && newPath.indexOf(initPath) === 0) {
            newDir = newPath;
        } else {
            const normalizedNewPath = path.normalize(currentPath + '/' + newPath);
            newDir = normalizedNewPath.indexOf(initPath) === 0 ? normalizedNewPath : initPath;
        }
        await fs.readdir(newDir);
        return newDir
    } catch {
        printError();
        return currentPath;
    }
}

const ls = async (currentDir) => {
    try {
        const listOfFiles = await fs.readdir(currentDir);
        console.log(listOfFiles);
    } catch {
        printError();
    }
}

export { up, cd, ls }
