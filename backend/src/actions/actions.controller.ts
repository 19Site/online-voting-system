import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpException, HttpStatus, Header, Headers } from '@nestjs/common';

import { ActionsService } from './actions.service';

import { DoLoginDto } from './dto/do-login.dto';

import { DoVoteDto } from './dto/do-vote.dto';

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

    @Post('/do-vote')
    @UsePipes(new ValidationPipe({ transform: true }))
    async doVote(@Body() dto: DoVoteDto, @Headers('Authorization') token: string): Promise<object> {

        try {

            const ok: boolean = await this.actionsService.doVote(token, +dto.optionId);

            return {

                ok: true
            };
        }

        catch (err) {

            throw new HttpException({

                ok: false,

                error: err.message
            }, HttpStatus.OK);
        }
    }
}
