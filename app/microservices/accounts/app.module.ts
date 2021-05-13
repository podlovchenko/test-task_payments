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

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_URL ? 'ec2-54-78-36-245.eu-west-1.compute.amazonaws.com' : 'localhost',
            port: 5432,
            username:  process.env.DATABASE_URL ? 'lrtsqafgkrgznc' : 'postgres',
            password:  process.env.DATABASE_URL ? 'b731753402194b4f21e0209903ce9f13e25974068560d96a60856d93573e43e4' : 'postgres',
            database:  process.env.DATABASE_URL ? 'd9p8gs7vi8vu1' : 'postgres',
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
