import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignOptionDto {

    @ApiProperty({ description: 'name' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'description' })
    description: string;
}
