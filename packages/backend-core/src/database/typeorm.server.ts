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
    
        //TODO: remove as DataSourceOptions and resolve actual type issue
        TypeormService._AppDataSource = new DataSource(dbConfig as DataSourceOptions);
    }

    _getDBConfig () {
        dotenv.config();
        return {
            type: process.env.DB_TYPE as DatabaseType,
            host: process.env.DB_HOST || 'localhost',
            port: +process.env.DB_PORT || 5436,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'admin',
            database: process.env.DB_NAME || 'twitter-clone',
            synchronize: true,
            logging: Boolean(process.env.DB_LOGGING) || false,
            subscribers: [],
            migrations: [],
        }
    }

    getRepository<T extends Repository<any>>(repository: ObjectType<T>): Repository<T> {
        return TypeormService._AppDataSource.manager.getRepository(repository);
    }
}