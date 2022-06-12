import { BrotliCompress, BrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import {
    createReadStream,
    createWriteStream
} from 'fs';
import path from 'path';
import { getNormalizedPath, isAccessToPath } from '../helpers/pathHelper.js';
import {printError} from '../helpers/handleError.js';

const compress = (filepath, newPath, currentDir) => {
    try {
        const file = getNormalizedPath(filepath, currentDir);
        const newDir = getNormalizedPath(newPath, currentDir);
        if (isAccessToPath(file) && isAccessToPath(newDir)) {
            const { name, ext } = path.parse(file)
            const archivePath = path.format({
                name,
                ext: ext + '.br',
                dir: newDir
            })
            const zip = BrotliCompress();
            const source = createReadStream(file);
            const destination = createWriteStream(archivePath);

            pipeline(source, zip, destination, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    } catch {
        printError();
    }
}

const decompress = (filepath, newPath, currentDir) => {
    try {
        const file = getNormalizedPath(filepath, currentDir);
        const newDir = getNormalizedPath(newPath, currentDir);
        if (isAccessToPath(file) && isAccessToPath(newDir)) {
            const { name } = path.parse(file);
            const newPath = path.format({
                dir: newDir,
                base: name
            });

            const unzip = BrotliDecompress();
            const source = createReadStream(file);
            const destination = createWriteStream(newPath);

            pipeline(source, unzip, destination, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    } catch {
        printError();
    }
}

export { compress, decompress };
