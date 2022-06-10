import { createInterface } from 'readline';

const handleExit = (username) => {
    if (process.platform === 'win32') {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on("SIGINT", () => {
            process.emit("SIGINT");
        });
    }

    process.on('SIGINT', function() {
        console.log(`Thank you for using File Manager, ${username}!`);
        process.exit();
    });
}

export default handleExit;