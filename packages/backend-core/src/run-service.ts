import Application from './application';

export function start(port) {
    try {
        
        const application = new Application();
        application.init();
        application.run(port);
    } catch (e) {
        process.exit(0);
    }
}
