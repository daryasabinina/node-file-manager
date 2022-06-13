import os from 'os';

import greet from './helpers/greet.js';
import { printCurrentPath } from './helpers/pathHelper.js';
import handleExit from './helpers/handleExit.js';
import { printError, printInput } from './helpers/handleError.js';
import { up, ls, cd } from './commands/navigation.js';
import { cat, add, rn, cp, mv, rm } from './commands/files.js';
import osCustom from './commands/os.js';
import hash from './commands/hash.js';
import { compress, decompress } from './commands/archive.js';

const start = (args) => {
    try {
        // init vars
        const user = args.find(el => el.indexOf('--username') === 0);
        const username = user.slice(11);
        const initDir = os.homedir();
        let currentDir = initDir;

        // init functions
        greet(username);
        printCurrentPath(initDir);
        handleExit(username);

        // listener
        process.stdin.on('data', async (data) => {
            const dataArr = data.toString().split(' ');
            const command = dataArr[0].trim();
            const args = dataArr.slice(1);

            switch (command) {
                case '.exit':
                    process.emit('SIGINT');
                    break;
                case 'up':
                    currentDir = up(currentDir);
                    break;
                case 'ls':
                    await ls(currentDir);
                    break;
                case 'cd':
                    currentDir = await cd(currentDir, args[0].trim());
                    break;
                case 'cat':
                    await cat(args[0].trim(), currentDir);
                    break;
                case 'add':
                    await add(args[0].trim(), currentDir);
                    break;
                case 'rn':
                    await rn(args[0].trim(), args[1].trim(), currentDir);
                    break;
                case 'cp':
                    await cp(args[0].trim(), args[1].trim(), currentDir);
                    break;
                case 'mv':
                    await mv(args[0].trim(), args[1].trim(), currentDir);
                    break;
                case 'rm':
                    await rm(args[0].trim(), currentDir);
                    break;
                case 'os':
                    await osCustom(args[0].trim());
                    break;
                case 'hash':
                    await hash(args[0].trim(), currentDir);
                    break;
                case 'compress':
                    await compress(args[0].trim(), args[1].trim(), currentDir);
                    break;
                case 'decompress':
                    await decompress(args[0].trim(), args[1].trim(), currentDir);
                    break;
                default:
                    printInput();
                    break;
            }

            printCurrentPath(currentDir);
        });
    } catch {
        printError();
    }

}

start(process.argv.slice(2));
