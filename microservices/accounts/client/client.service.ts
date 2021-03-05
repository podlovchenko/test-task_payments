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
    ClientEntity,
} from './client.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>
    ) {}

    findOne(email: string) {
        return this.clientRepository.findOne({email});
    }

    create(email: string) {
        return this.clientRepository.save({
            email
        });
    }
}
