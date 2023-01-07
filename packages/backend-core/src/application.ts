import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Bootstrap } from './bootstrap';
import { InversifyExpressServer } from 'inversify-express-utils';

export default class Application  {
    private _expressServer: any;

   async init(services, repositories) {
        Bootstrap.init(services, repositories);
        this._expressServer = await this._setupServer();
        return this._expressServer;
    }

    private async  _setupServer() {
        const server = new InversifyExpressServer(Bootstrap.container);
        this._expressServer = server.setConfig((theApp) => {
            this._setupMiddleware(theApp);
        }).setErrorConfig((theApp) => {
            this._setupErrorMiddleware(theApp);
        }).build();
        return this._expressServer;
    }
    run(port: number) {
        console.log(this._expressServer.listen, 'the listen method');
        this._expressServer.listen(port, () => {
            console.log(`Server is listening on prt ${port}`);
        });
    }

    private _setupMiddleware(app: express.Application) {
        app.use(bodyParser.json('application/json'));
        app.use(bodyParser.urlencoded({extended: true}));
    }

    private _setupErrorMiddleware(app: express.Application) {
        //handling all errors: known and unknown
        //error middleware always takes four arguments: https://expressjs.com/en/guide/error-handling.html
        app.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
            const {data }= error;
            const message = error.message || data?.message;
            const code = error._code || data?.code;
            console.error(`Error ocurred: ${message}`, {
                meta: {
                    message, 
                    code,
                    stack: error.stack
                }
            });
            return response.status(500).send(message);
        });
    }
 
}