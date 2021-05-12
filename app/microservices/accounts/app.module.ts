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
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
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
