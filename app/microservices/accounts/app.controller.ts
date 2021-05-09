import {
    Controller,
    Post,
    Body,
    Req,
    Res,
} from '@nestjs/common';
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

const {
    handlers,
} = config;

@Controller(handlers.accounts.prefix)
export class AppController {

    constructor(
        private readonly accountService: AccountService,
        private readonly clientService: ClientService,
        private readonly transactionService: TransactionService,
    ) {}

    @Post()
    async create(
        @Body() body: AccountsCreateDto,
        @Req() request: Request,
        @Res() response: Response,
    ) {
        try {
            const {
                email,
            } = body;

            const {
                id: clientId,
            } = await this.clientService.create(email);
            const {
                id: accountId,
            }  = await this.accountService.create({
                client: clientId,
                amount: 0,
            });

            response.status(201).send({
                email,
                client: clientId,
                account: accountId,
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
            const {
                paymentId,
                email,
            } = body;
            const amount = +body.amount;

            if (amount < 0) {
                return response
                    .status(400)
                    .send('Incorrect data\n');
            }

            const client = await this.clientService.findOne(email);
            if (!client) {
                return response
                    .status(404)
                    .send('Client not found\n');
            }

            const {
                id: clientId,
            } = client;

            const account = await this.accountService.findOne(clientId);
            if (!account) {
                return response
                    .status(404)
                    .send('Account not found\n');
            }

            const {
                id: accountId,
                amount: accountAmount,
            } = account;

            await this.transactionService.add({
                paymentId,
                accountTo: accountId,
                type: TransactionTypes.Refill,
                amount,
            });

            const updatedAmount = accountAmount + amount;

            await this.accountService.update({
                id: accountId,
                client: clientId,
                amount: updatedAmount,
            });

            response.status(200).send({
                email,
                account: accountId,
                amount: updatedAmount,
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
            const {
                userFrom,
                userTo,
            } = body;
            const amount = +body.amount;

            if (amount < 0) {
                return response
                    .status(400)
                    .send('Incorrect data\n');
            }

            const accountFrom = await this.accountService.findOne(userFrom);
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

            const accountTo = await this.accountService.findOne(userTo);
            if (!accountTo) {
                return response
                    .status(404)
                    .send('AccountTo not found\n');
            }

            await this.transactionService.add({
                accountFrom: accountFrom.id,
                accountTo: accountTo.id,
                type: TransactionTypes.Transfer,
                amount,
            });

            const updatedAmountFrom = accountFrom.amount - amount;
            const updatedAmountTo = accountTo.amount + amount;

            await this.accountService.update({
                id: accountFrom.id,
                client: userFrom,
                amount: updatedAmountFrom,
            });

            await this.accountService.update({
                id: accountTo.id,
                client: userTo,
                amount: updatedAmountTo,
            });

            response.status(200).send({
                client: userFrom,
                amount: updatedAmountFrom,
            });
        } catch (err) {
            throw err;
        }
    }
}