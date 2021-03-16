import {
    Injectable,
} from '@nestjs/common';
import {
    EntityManager,
} from 'typeorm';

import {
    AccountEntity,
} from './account.entity';

@Injectable()
export class AccountService {
    constructor() {}

    findOne(entityManager: EntityManager, client: number) {
        return entityManager
            .createQueryBuilder()
            .setLock('pessimistic_write')
            .select('account_entity')
            .from(AccountEntity, 'account_entity')
            .where('account_entity.client = :id', {
                id: client,
            })
            .getOne();
    }

    async create(entityManager: EntityManager, {
        client,
        amount,
    }) {
        const {
            raw,
        } = await entityManager
            .createQueryBuilder()
            .insert()
            .into(AccountEntity)
            .values([
                {
                    client,
                    amount,
                },
            ])
            .execute();

        return raw[0].id;
    }

    update(entityManager: EntityManager, {
        id,
        amount,
    }) {
        return entityManager
            .createQueryBuilder()
            .update(AccountEntity)
            .set({
                amount,
            })
            .where("id = :id", {
                id,
            })
            .execute();
    }
}
