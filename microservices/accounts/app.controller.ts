import {
    Controller,
    Post,
    Body,
    Req,
    Res,
} from '@nestjs/common';
import {
    InjectConnection,
} from '@nestjs/typeorm';
import {
    Connection,
} from 'typeorm';
import {
    Request,
    Response,
} from 'express';

import config from '../../configs';

import {
    TransactionTypes,
} from './types';
import {
    AccountsCreateDto,
    AccountsPaymentDto,
    AccountsTransferDto,
} from './dto'
import {
    AccountService,
} from './account/account.service';
import {
    ClientService,
} from './client/client.service';
import {
    TransactionService,
} from './transaction/transaction.service';

const numeral = require('numeral');

const {
    handlers,
} = config;

@Controller(handlers.accounts.prefix)
export class AppController {

    constructor(
        private readonly accountService: AccountService,
        private readonly clientService: ClientService,
        private readonly transactionService: TransactionService,
        @InjectConnection() private connection: Connection,
    ) {}

    @Post()
    async create(
        @Body() body: AccountsCreateDto,
        @Req() request: Request,
        @Res() response: Response,
    ) {
        try {
            await this.connection.transaction(async entityManager => {
                const {
                    email,
                } = body;

                const clientId = await this.clientService.create(entityManager, email);
                const accountId  = await this.accountService.create(entityManager,{
                    client: clientId,
                    amount: 0,
                });

                response.status(201).send({
                    email,
                    client: clientId,
                    account: accountId,
                });
            });
        } catch (err) {
            if (err.code === '23505') {
                return response
                    .status(400)
                    .send('Email already exists\n');
            }

            throw err;
        }
    }

    @Post(handlers.accounts.payment)
    async payment(
        @Body() body: AccountsPaymentDto,
        @Req() request: Request,
        @Res() response: Response,
    ) {
        try {
            await this.connection.transaction(async entityManager => {
                const {
                    paymentId,
                    email,
                } = body;
                const amount = Number(body.amount);

                if (!amount || amount < 0) {
                    return response
                        .status(400)
                        .send('Incorrect data\n');
                }

                const client = await this.clientService.findOne(entityManager, email);

                if (!client) {
                    return response
                        .status(404)
                        .send('Client not found\n');
                }

                const {
                    id: clientId,
                } = client;

                const account = await this.accountService.findOne(entityManager, clientId);
                if (!account) {
                    return response
                        .status(404)
                        .send('Account not found\n');
                }

                const {
                    id: accountId,
                    amount: accountAmount,
                } = account;

                await this.transactionService.add(entityManager, {
                    paymentId,
                    accountTo: accountId,
                    type: TransactionTypes.Refill,
                    amount,
                });

                const updatedAmount = numeral(accountAmount).add(amount).value();

                await this.accountService.update(entityManager, {
                    id: accountId,
                    amount: updatedAmount,
                });

                response.status(200).send({
                    email,
                    account: accountId,
                    amount: updatedAmount,
                });
            });
        } catch (err) {
            if (err.code === '23505') {
                return response
                    .status(400)
                    .send('PaymentId already exists\n');
            }

            throw err;
        }
    }

    @Post(handlers.accounts.transfer)
    async transfer(
        @Body() body: AccountsTransferDto,
        @Req() request: Request,
        @Res() response: Response,
    ) {
        try {
            await this.connection.transaction(async entityManager => {
                const {
                    userFrom,
                    userTo,
                } = body;
                const amount = Number(body.amount);

                if (!amount || amount < 0) {
                    return response
                        .status(400)
                        .send('Incorrect data\n');
                }

                const accountFrom = await this.accountService.findOne(entityManager, userFrom);
                if (!accountFrom) {
                    return response
                        .status(404)
                        .send('AccountFrom not found\n');
                }
                if (accountFrom.amount - amount < 0) {
                    return response
                        .status(400)
                        .send('Insufficient funds\n');
                }

                const accountTo = await this.accountService.findOne(entityManager, userTo);
                if (!accountTo) {
                    return response
                        .status(404)
                        .send('AccountTo not found\n');
                }

                await this.transactionService.add(entityManager,{
                    accountFrom: accountFrom.id,
                    accountTo: accountTo.id,
                    type: TransactionTypes.Transfer,
                    amount,
                });

                const updatedAmountFrom = numeral(accountFrom.amount).subtract(amount).value();
                const updatedAmountTo = numeral(accountTo.amount).add(amount).value();

                await this.accountService.update(entityManager, {
                    id: accountFrom.id,
                    amount: updatedAmountFrom,
                });

                await this.accountService.update(entityManager, {
                    id: accountTo.id,
                    amount: updatedAmountTo,
                });

                response.status(200).send({
                    client: userFrom,
                    amount: updatedAmountFrom,
                });
            });
        } catch (err) {
            throw err;
        }
    }
}