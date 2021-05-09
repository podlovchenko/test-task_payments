import {
    Entity,
    Column,
    PrimaryColumn, PrimaryGeneratedColumn,
} from 'typeorm';

import {
    TransactionTypes,
} from '../types';

@Entity()
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        unique: true,
    })
    paymentId: string;

    @Column({
        nullable: true,
    })
    accountFrom: number;

    @Column()
    accountTo: number;

    @Column()
    type:  TransactionTypes;

    @Column()
    amount: number;
}