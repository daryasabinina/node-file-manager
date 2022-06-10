import os from 'os';

import greet from './helpers/greet.js';
import handlePath from './helpers/handlePath.js';
import handleExit from './helpers/handleExit.js';

const start = (args) => {

    // init vars
    const user = args.find(el => el.indexOf('--username') === 0);
    const username = user.slice(11);
    const initDir = os.homedir();
    const currentDir = initDir;

    // init functions
    greet(username);
    handlePath(initDir);
    handleExit(username);

    // listener
    process.stdin.on('data', (data) => {
        switch (data.toString()) {
            case '.exit\n':
                process.emit('SIGINT');
                break;
            default:
                console.log('Invalid input');
                break;
        }

        handlePath(currentDir);
    });
}

start(process.argv.slice(2));