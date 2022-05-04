import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class DoVoteDto {

    @ApiProperty({ description: 'option id' })
    @IsNotEmpty()
    optionId: number;
}
