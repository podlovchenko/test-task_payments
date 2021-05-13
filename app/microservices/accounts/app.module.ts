import {
    Module,
} from '@nestjs/common';
import {
    TypeOrmModule,
} from '@nestjs/typeorm';

import {
    AppController,
} from './app.controller';
import {
    AccountModule,
} from './account/account.module';
import {
    ClientModule,
} from './client/client.module';
import {
    TransactionModule,
} from './transaction/transaction.module';

const parseDbUrl = require('parse-database-url');
const dbConfig = process.env.DATABASE_URL ? parseDbUrl(process.env.DATABASE_URL) : {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
};

console.log(dbConfig);

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...dbConfig,
            type: 'postgres',
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false,
                },
            },
            autoLoadEntities: true,
            synchronize: true,
        }),
        AccountModule,
        ClientModule,
        TransactionModule,
    ],
    controllers: [
        AppController,
    ],
})
export class AppModule {}
