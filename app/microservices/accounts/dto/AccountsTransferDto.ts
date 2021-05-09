import {
    IsNumber,
    IsString,
} from 'class-validator';

export class AccountsTransferDto {

    @IsNumber()
    userFrom: number;

    @IsNumber()
    userTo: number;

    @IsNumber()
    amount: number;

}
