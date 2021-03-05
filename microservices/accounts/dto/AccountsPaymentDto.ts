import {
    IsNumber,
    IsString,
} from 'class-validator';

export class AccountsPaymentDto {

    @IsString()
    paymentId: string;

    @IsString()
    email: string;

    @IsNumber()
    amount: number;

}
