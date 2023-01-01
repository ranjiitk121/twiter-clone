const express = require('express');

async function start(port) {
    try {
        const app = express();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (e) {

        console.error(`Failed to run service ${options.serviceName}.`, e);
        process.exit(0);
    }
}

module.exports = start;