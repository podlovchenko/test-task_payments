import {
    Injectable,
} from '@nestjs/common';
import {
    EntityManager,
} from 'typeorm';

import {
    ClientEntity,
} from './client.entity';

@Injectable()
export class ClientService {
    constructor() {}

    findOne(entityManager: EntityManager, email: string) {
        return entityManager
            .createQueryBuilder()
            .setLock('pessimistic_write')
            .select('client_entity')
            .from(ClientEntity, 'client_entity')
            .where('client_entity.email = :email', {
                email,
            })
            .getOne();
    }

    async create(entityManager: EntityManager, email: string) {
        const {
            raw,
        } = await entityManager
                .createQueryBuilder()
                .insert()
                .into(ClientEntity)
                .values([
                    {
                        email,
                    },
                ])
                .execute();

        return raw[0].id;
    }
}
