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
    TransactionEntity,
} from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>
    ) {
    }

    add(entity: Partial<TransactionEntity>) {
        return this.transactionRepository.save(entity);
    }
}
