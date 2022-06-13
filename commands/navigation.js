import fs from 'fs/promises';

import { printError } from '../helpers/handleError.js';
import { getNormalizedPath, isAccessToPath } from '../helpers/pathHelper.js';

const up = (currentPath) => {
    const normalizedPath = getNormalizedPath('..', currentPath);
    return isAccessToPath(normalizedPath) ? normalizedPath : currentPath;
}

const cd = async (currentPath, newPath) => {
    try {
        let newDir = ''
        const normalizedPath = getNormalizedPath(newPath, currentPath);

        if (isAccessToPath(normalizedPath)) {
            newDir = normalizedPath;
        } else {
            newDir = currentPath;
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
