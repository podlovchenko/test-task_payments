import {
    Injectable,
} from '@nestjs/common';
import {
    InjectRepository,
} from '@nestjs/typeorm';
import {
    Repository,
} from 'typeorm';

import {
    AccountEntity,
} from './account.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>
    ) {
    }

    findOne(client: number) {
        return this.accountRepository.findOne({client});
    }

    create({
               client,
               amount,
           }) {
        return this.accountRepository.save({
            client,
            amount,
        });
    }

    update({
        id,
               client,
               amount,
           }) {
        return this.accountRepository.save({
            id,
            client,
            amount,
        });
    }
}
