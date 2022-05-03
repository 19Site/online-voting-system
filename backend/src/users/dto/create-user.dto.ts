import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @Matches(/^[A-Z][0-9]{7}$/i, { message: 'invalid hkid format' })
    hkid: string;
}
