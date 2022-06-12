import crypto from 'crypto';
import fs from 'fs/promises';

import { getNormalizedPath, isAccessToPath } from '../helpers/pathHelper.js';
import { printError } from '../helpers/handleError.js';

export const hash = async (filepath, currentDir) => {
    try {
        const file = getNormalizedPath(filepath, currentDir);
        if (isAccessToPath(file)) {
            const hash = crypto.createHash('sha256');
            const content = await fs.readFile(file);
            console.log(hash.update(content).digest('hex'));
        } else {
            throw new Error();
        }
    } catch {
        printError();
    }
};

export default hash;
