import {
    Injectable,
} from '@nestjs/common';
import {
    EntityManager,
} from 'typeorm';

import {
    TransactionEntity,
} from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor() {}

    async add(entityManager: EntityManager, entity: Partial<TransactionEntity>) {
        const {
            raw,
        } = await entityManager
            .createQueryBuilder()
            .insert()
            .into(TransactionEntity)
            .values([
                entity,
            ])
            .execute()
        return raw[0];
    }
}
