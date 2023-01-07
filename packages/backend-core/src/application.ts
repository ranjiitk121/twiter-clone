import * as express from 'express';
import * as bodyParser from 'body-parser';

export default class Application  {
    private _expressServer: any;

    init() {
        this._expressServer = express.default();
        this._setupMiddleware(this._expressServer);
        this._setupErrorMiddleware(this._expressServer);
        return this._expressServer;
    }

    run(port: number) {
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