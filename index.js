import os from 'os';

import greet from './helpers/greet.js';
import { printCurrentPath } from './helpers/pathHelper.js';
import handleExit from './helpers/handleExit.js';
import { printError } from './helpers/handleError.js';
import { up, ls, cd } from './commands/navigation.js';

const start = (args) => {
    try {
        // init vars
        const user = args.find(el => el.indexOf('--username') === 0);
        const username = user.slice(11);
        const initDir = os.homedir();
        let currentDir = initDir;

        /*
        * getHomedir(){
  return process.env.HOME || process.env.USERPROFILE;
}
        * */

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
                    currentDir = up(currentDir, initDir);
                    break;
                case 'ls':
                    await ls(currentDir);
                    break;
                case 'cd':
                    currentDir = await cd(currentDir, args[0].trim(), initDir);
                    break;
                default:
                    console.log('Invalid input');
                    break;
            }

            printCurrentPath(currentDir);
        });
    } catch {
        printError();
    }

}

start(process.argv.slice(2));