import "reflect-metadata";
import { DataSource, DataSourceOptions, DatabaseType, Repository, ObjectType } from "typeorm";
import * as dotenv from 'dotenv';

export class TypeormService {
    private  _AppDataSource: DataSource;

    async connect(entities: any[]) {
        const dbConfig = {
            ...this._getDBConfig(),
            entities
        };
     
        //TODO: remove as DataSourceOptions and resolve actual type issue
        this._AppDataSource = new DataSource(dbConfig as DataSourceOptions);
        try {
            await this._AppDataSource.initialize();
            console.log("Data Source has been initialized!")
        } catch(err) {
            console.log(err);
            throw new Error('Failed to connect to db');
        }
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
        return this._AppDataSource.manager.getRepository(repository);
    }
}