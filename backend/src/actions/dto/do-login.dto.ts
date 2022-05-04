import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class DoLoginDto {

    @ApiProperty({ description: 'hkid' })
    @IsNotEmpty()
    @Matches(/^[A-Z][0-9]{7}$/i, { message: 'invalid hkid format' })
    hkid: string;
}
