import express from 'express';

export default async function start(port) {
    try {
        const app = express();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (e) {
        process.exit(0);
    }
}
