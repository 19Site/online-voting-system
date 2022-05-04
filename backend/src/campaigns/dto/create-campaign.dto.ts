import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {

    @ApiProperty({ description: 'name' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'description' })
    description: string;

    @ApiProperty({ description: 'start at' })
    @IsNotEmpty()
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}(\T| )[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{3}Z)$/, { message: 'invalid format of start at' })
    startAt: Date;

    @ApiProperty({ description: 'end at' })
    @IsNotEmpty()
    @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}(\T| )[0-9]{2}:[0-9]{2}:[0-9]{2}(|\.[0-9]{3}Z)$/, { message: 'invalid format of end at' })
    endAt: Date;
}
