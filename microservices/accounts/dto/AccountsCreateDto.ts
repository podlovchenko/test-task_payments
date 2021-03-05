import {
    IsNumber,
    IsString,
} from 'class-validator';

export class AccountsCreateDto {

    @IsString()
    email: string;

}
