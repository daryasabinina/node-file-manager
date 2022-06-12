import fsProm from 'fs/promises';
import fs from 'fs';
import Stream from 'stream';
import path from 'path';

import { printError } from '../helpers/handleError.js';
import { printCurrentPath } from '../helpers/pathHelper.js';
import { getNormalizedPath, isAccessToPath } from '../helpers/pathHelper.js';

const cat = async (filepath, currentDir) => {
    try {
        const file = getNormalizedPath(filepath, currentDir);
        if (isAccessToPath(file)) {
            const readableStream = new Stream.Readable();
            readableStream._read = () => {};
            const content = await fsProm.readFile(file);
            readableStream.push(content);
            readableStream.on('data', (data) => {
                console.log(data.toString());
                printCurrentPath(currentDir);
            })
        } else {
            throw new Error();
        }
    } catch {
        printError();
    }
};

const add = async (filename, currentDir) => {
    try {
        const file = path.format({
            dir: currentDir,
            base: filename
        });
        fs.createWriteStream(file);
    } catch {
        printError();
    }
};

const rn = async (filepath, newName, currentDir) => {
    try {
        const file = getNormalizedPath(filepath, currentDir);
        if (isAccessToPath(file)) {
            const { dir } = path.parse(file);
            const newFilePath = path.format({
                dir,
                base: newName
            })
            const content = await fsProm.readFile(file);
            const stream = fs.createWriteStream(newFilePath);

            stream.write(content);
            await fsProm.unlink(file);
        } else {
            throw new Error();
        }
    } catch {
        printError();
    }
};

const cp = async (filepath, newDir, currentDir) => {
    try {
        const file = getNormalizedPath(filepath, currentDir);
        const normalizedNewDir = getNormalizedPath(newDir, currentDir);
        if (isAccessToPath(file) && isAccessToPath(normalizedNewDir)) {
            const { base } = path.parse(file);
            const newFilePath = path.format({
                dir: normalizedNewDir,
                base
            })
            const content = await fsProm.readFile(file);
            const stream = fs.createWriteStream(newFilePath);

            stream.write(content);
        } else {
            throw new Error();
        }
    } catch {
        printError();
    }
};

const mv = async (filepath, newDir, currentDir) => {
    try {
        const file = getNormalizedPath(filepath, currentDir);
        await cp(filepath, newDir, currentDir);
        await fsProm.unlink(file);
    } catch {
        printError();
    }
};

const rm = async (filepath, currentDir) => {
    try {
        const file = getNormalizedPath(filepath, currentDir);
        if (isAccessToPath(file)) {
            await fsProm.unlink(file);
        } else {
            throw new Error()
        }
    } catch {
        printError();
    }
};

export {
    cat,
    add,
    rn,
    cp,
    mv,
    rm
}

