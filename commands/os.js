import os from 'os';

import { printError, printInput } from '../helpers/handleError.js';

const osCustom = (arg) => {
    try {
        switch(arg) {
            case '--EOL':
                console.log(JSON.stringify(os.EOL));
                break;
            case '--cpus':
                console.log(os.cpus().map(obj => {
                    delete obj.times;
                    return obj;
                }));
                break;
            case '--homedir':
                console.log(os.homedir());
                break;
            case '--username':
                console.log(os.userInfo().username);
                break;
            case '--architecture':
                console.log(os.arch());
                break;
            default:
                printInput();
                break;
        }
    } catch {
        printError();
    }
}

export default osCustom;
