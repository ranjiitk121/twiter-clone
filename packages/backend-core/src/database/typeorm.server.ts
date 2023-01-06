import "reflect-metadata";
import { DataSource, DataSourceOptions, DatabaseType, Repository, ObjectType } from "typeorm";
import * as dotenv from 'dotenv';

export class TypeormService {
    private static _instance: TypeormService | null = null;
    private static _AppDataSource: DataSource;

    static getInstance() {
        if(!TypeormService._instance) {
            TypeormService._instance = new TypeormService();
        }
        return TypeormService._instance;
    }

    async connect(entities: any[]) {
        const dbConfig = {
            ...this._getDBConfig(),
            entities
        };
        console.log(dbConfig);
        
        //TODO: remove as DataSourceOptions and resolve actual type issue
        TypeormService._AppDataSource = new DataSource(dbConfig as DataSourceOptions);
        TypeormService._AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
    }

    _getDBConfig () {
        dotenv.config();
        return {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: process.env.DB_NAME || 'twitter-clone',
            synchronize: true,
            logging:  true,
            subscribers: [],
            migrations: [],
        }
    }

    getRepository<T extends Repository<any>>(repository: ObjectType<T>): Repository<T> {
        return TypeormService._AppDataSource.manager.getRepository(repository);
    }
}