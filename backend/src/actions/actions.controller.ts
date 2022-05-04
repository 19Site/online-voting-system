import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

import { ActionsService } from './actions.service';

import { DoLoginDto } from './dto/do-login.dto';

import { User } from '../users/entities/user.entity';

@Controller('actions')
export class ActionsController {

    /**
     * constructor
     */
    constructor(private readonly actionsService: ActionsService) { }

    @Post('/do-login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async doLogin(@Body() dto: DoLoginDto): Promise<object> {

        const tokens: object = await this.actionsService.doLogin(dto.hkid);

        return {

            ok: true,

            ...tokens
        };
    }
}
